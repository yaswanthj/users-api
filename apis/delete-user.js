const errorCodes = require('../error-codes');
const usersQuery = require('../database/query-structure');

module.exports = (req, res) => {
    try {
        const id = req.headers.id;
        usersQuery.deleteUser(id, function(data){
            let response = {};
            if(data.deletedCount === 1) {
                response['message'] = 'User Deleted Successfully';
            } else {
                response['message'] = 'User Not Exists';
            }
            response['status'] = data.ok;
            res.send(response);
        })
    } catch(Error) {
        res.status(500).send({
            "data": errorCodes.INTERNAL_SERVER_ERROR
        });
    }
};
