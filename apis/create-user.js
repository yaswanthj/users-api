const errorCodes = require('../error-codes');
const usersQuery = require('../database/query-structure');
const validations = require('../database/validation');

module.exports = (req, res) => {
    const payload = req.body;
    try {
        let isPayloadValid = validations.validateCreateUserPayload(payload);
        if(isPayloadValid){
            usersQuery.addUserIntoSystem(payload, function(data){
                res.send(data);
            })
        } else {
            res.send({
                "data": errorCodes.INVALID_PAYLOAD
            });
        }
    } catch(Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
};
