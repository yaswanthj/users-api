let Users = require('../models/users');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();

chai.use(chaiHttp);

let testingApi = '/get-user';
let createToken = '/create-token';

chai.request(server)
    .get(createToken)
    .set({
        'email': 'yaswanth@sugarboxnetworks.com'
    })
    .end((err, res) => {
        res.text.should.be.a('string');
        let token = res.text;

        describe('/GET get-user API Test', () => {
            it('Creating a user & getting the same user', (done) => {
                let userData = {
                    displayName: "Testing User",
                    email: 'testing@tester.com',
                }
                let user = new Users(userData);
                user.save((err, newUser) => {
                    chai.request(server)
                        .get(testingApi)
                        .set({
                            "Authorization": `Bearer ${token}`,
                            id: newUser._id
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('array');
                            res.body.length.should.be.eql(1);
                            let data = res.body[0];
                            data.should.have.property('displayName').eql(userData.displayName);
                            data.should.have.property('userEmail').eql(userData.email);
                            done();
                        });
                });
            });

            it('When given userId dont exist or wrong userID', (done) => {
                chai.request(server)
                    .get(testingApi)
                    .set({
                        "Authorization": `Bearer ${token}`,
                        id: '60d0d811e7e6040a5c00213f'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });

            it('When userId key not sent', (done) => {
                chai.request(server)
                    .get(testingApi)
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        res.body.length.should.be.eql(0);
                        done();
                    });
            });

            it('When userId sent with no bearer token', (done) => {
                chai.request(server)
                    .get(testingApi)
                    .set({
                        id: '60d0d811e7e6040a5c00213e'
                    })
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object');
                        done();
                    });
            });

            it('it should get empty data & Auth Error with invalid token', (done) => {
                chai.request(server)
                    .get(testingApi)
                    .set({
                        "Authorization": `Bearer ey2`,
                        id: '60d0d811e7e6040a5c00213e'
                    })
                    .end((err, res) => {
                        res.should.have.status(401);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data');
                        done();
                    });
            });
        });
    });