const errorCodes = require('../error-codes');
const dbQuery = require('../database/query-structure');

module.exports = (req, res) => {
    const payload = req.body;
    try {
        dbQuery.addTask(payload, function(data){
            res.send(data);
        })
    } catch(Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
};
