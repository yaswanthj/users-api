const ObjectId = require('mongodb').ObjectID;
const databaseOperations = require('./database-operations');

module.exports = {
    
    getAllUsers: function(callback) {
        const condition = {};
        const returnValue = {
            "email": 1,
            "_id": 1,
            "displayName": 1
        };
        databaseOperations.getUsers(condition, returnValue, function (response) {
            callback(response);
        });
    },
    addUserIntoSystem: function(data, callback) {
        const createdOn = Math.ceil(Date.now()/1000);
        var userObject = {
            "displayName": data.displayName,
            "email": data.email,
            "createdOn": createdOn,
            "lastUpdatedOn": createdOn
        };
        databaseOperations.insertSingleUser(userObject, function(response) {
            callback(response);
        });
    },
    deleteUser: function(id, callback) {
        const condition = {
            "_id": id
        };
        databaseOperations.deleteSingleUser(condition, function (response) {
            callback(response);
        });
    },
    
    addTask: function(data, callback) {
        const createdOn = Math.ceil(Date.now()/1000);
        var taskObject = {
            "text": data.text,
            "type": 'normal',
            "userID": data.userID,
            "createdOn": createdOn,
            "lastUpdatedOn": createdOn
        };
        databaseOperations.insertSingleTask(taskObject, function(response) {
            callback(response);
        });
    },
    getUserData: function (id, callback) {
        var condition = [{
                $match: {
                    '_id': ObjectId(id)
                }
            },
            {
                '$lookup': {
                    'from': "tasks",
                    'localField': "_id",
                    'foreignField': "userID",
                    'as': "userDetails"
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "displayName": "$displayName",
                    "userID": "$id",
                    "userEmail": "$email",
                    "createdOn": "$createdOn",
                    "userDetails": "$userDetails"
                }
            }
        ];
        databaseOperations.executeAggregate(condition, function (response) {
            callback(response);
        });
    }
    
}
