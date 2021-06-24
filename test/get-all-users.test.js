let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');

chai.use(chaiHttp);

let testingApi = '/get-all-users';
let createToken = '/create-token';

chai.request(server)
    .get(createToken)
    .set({
        'email': 'yaswanth@sugarboxnetworks.com'
    })
    .end((err, res) => {
        res.text.should.be.a('string');
        let token = res.text;

        describe('/GET get-all-user API Test', () => {
            it('it should GET all users', (done) => {
                chai.request(server)
                    .get(testingApi)
                    .set({
                        "Authorization": `Bearer ${token}`
                    })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('array');
                        // res.body.length.should.be.greater(0);
                        done();
                    });
            });

            it('it should get empty data & Auth Error', (done) => {
                chai.request(server)
                    .get(testingApi)
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