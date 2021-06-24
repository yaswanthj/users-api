const errorCodes = require('../error-codes');
const usersQuery = require('../database/query-structure');

module.exports = (req, res) => {
    try {
        const id = req.headers.id;
        usersQuery.getUserData(id, function(data){
            if(data){
                res.send(data);
            } else{
                res.send([]);
            }
        })
    } catch(Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
};
