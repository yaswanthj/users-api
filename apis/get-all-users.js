const errorCodes = require('../error-codes');
const usersQuery = require('../database/query-structure');

module.exports = (req, res) => {
    try {
        usersQuery.getAllUsers(function(data){
            res.send(data);
        })
    } catch(Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
};
