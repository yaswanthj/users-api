const errorCodes = require('../error-codes');
const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    try {
        const bearerHeader = req.header('authorization');
        if (bearerHeader) {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1];
            jwt.verify(bearerToken, config.secret, function (err, decoded) {
                if (decoded) {
                    return next();
                } else {
                    res.status(401).send({
                        "data": errorCodes.UNAUTHORIZED
                    });
                }
            });
          } else {
            res.sendStatus(403);
          }
    } catch (Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
}