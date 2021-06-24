const errorCodes = require('../error-codes');
const config = require('../config/config');
var jwt = require("jsonwebtoken");

module.exports = (req, res) => {
    try {
        const email = req.headers.email;
        var token = jwt.sign({ email: email }, config.secret, {
            expiresIn: 86400 // 24 hours
        });
        res.send(token);
    } catch(Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
};
