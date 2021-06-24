let Users = require('../models/users');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

chai.use(chaiHttp);

let api = "/delete-user";
let createToken = '/create-token';

chai.request(server)
    .get(createToken)
    .set({
        'email': 'yaswanth@sugarboxnetworks.com'
    })
    .end((err, res) => {
        res.text.should.be.a('string');
        let token = res.text;
        describe('/Delete a user in database API Test', () => {
            it('Creating & deleting the user', (done) => {
                let user = new Users({
                    displayName: "Testing User",
                    email: 'testing@tester.com',
                });
                user.save((err, newUser) => {
                    chai.request(server)
                        .delete(api)
                        .set({
                            "Authorization": `Bearer ${token}`,
                            "id": newUser._id
                        })
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.should.be.a('object');
                            res.body.should.have.property('message').eql('User Deleted Successfully');
                            res.body.should.have.property('status').eql(1);
                            done();
                        });
                })
            });

            it('Deleting a non existed user', (done) => {
                chai.request(server)
                    .delete(api)
                    .set({
                        "Authorization": `Bearer ${token}`,
                        "id": '60d383e5bd1004186410f741'
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('User Not Exists');
                        res.body.should.have.property('status').eql(1);
                        done();
                    });
            });


            it('Trying to delete with no Bearer token', (done) => {
                chai.request(server)
                    .delete(api)
                    .set({
                        id: '60d0d811e7e6040a5c00213e'
                    })
                    .end((err, res) => {
                        res.should.have.status(403);
                        res.body.should.be.a('object');
                        done();
                    });
            });


        });
    });
describe('/Delete a user in database API Test', () => {
    it('Trying to delete the user with invalid Bearer Token', (done) => {
        chai.request(server)
            .delete(api)
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