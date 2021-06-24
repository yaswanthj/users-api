const errorCodes = require('../error-codes');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

chai.use(chaiHttp);


let testingApi = '/create-user';
let createToken = '/create-token';
chai.request(server)
    .get(createToken)
    .set({
        'email': 'yaswanth@sugarboxnetworks.com'
    })
    .end((err, res) => {
        res.text.should.be.a('string');
        let token = res.text;

        describe('/GET create-user API Test', () => {
            it('it should create user', (done) => {
                let user = {
                    "email": "test.user@sugarboxnetworks.com",
                    "displayName": "Yaswanth Testing user"
                }
                chai.request(server)
                    .post(testingApi)
                    .send(user)
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('_id');
                        done();
                    });
            });


            it('Passing empty object with no details', (done) => {
                chai.request(server)
                    .post(testingApi)
                    .send({})
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data').eql(errorCodes.INVALID_PAYLOAD);
                        done();
                    });
            });

            it('Passing email as normal string', (done) => {
                chai.request(server)
                    .post(testingApi)
                    .send({
                        email: 'testing'
                    })
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data').eql(errorCodes.INVALID_PAYLOAD);
                        done();
                    });
            });

            it('Passing no user data', (done) => {
                chai.request(server)
                    .post(testingApi)
                    .send({})
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('data').eql(errorCodes.INVALID_PAYLOAD);
                        done();
                    });
            });

            it('it should No Bearer Token', (done) => {
                let user = {
                    "email": "test.user@sugarboxnetworks.com",
                    "displayName": "Yaswanth Testing user"
                }
                chai.request(server)
                    .post(testingApi)
                    .send(user)
                    .set({})
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object');
                        done();
                    });
            });

            it('it should get empty data & Auth Error with invalid token', (done) => {
                let user = {
                    "email": "test.user@sugarboxnetworks.com",
                    "displayName": "Yaswanth Testing user"
                }
                chai.request(server)
                    .post(testingApi)
                    .send(user)
                    .set({
                        "Authorization": `Bearer ey2`
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