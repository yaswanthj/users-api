const mongoose = require('mongoose');

/* Schema is included here */
const UserSchema = mongoose.model('userSchema');
const TaskSchema = mongoose.model('taskSchema');

module.exports = {
    getUsers: function(condition, returnValue, callback) {
        UserSchema.find(condition, returnValue, function(error, response) {
            if(error) {
                callback(false);
                const data = {
                    "error": error,
                    "timestamp": Date.now(),
                    "functionName": "getUsers",
                    "condition": condition,
                    "returnValue": returnValue
                };
                console.log('error', ' ', data);
            } else {
                callback(response);
            }
        });
    },

    insertSingleUser: function(insertionValue, callback) {
        new UserSchema(insertionValue).save(function(error, response) {
            if(error) {
                var data = {
                    "error": error,
                    "timestamp": Date.now(),
                    "functionName": "insertSingleUser",
                    "insertionValue": insertionValue
                };
                console.log('error', ' ', data);
                callback(false);
            } else {
                callback(response);
            }
        });
    },
    
    deleteSingleUser: function(condition, callback) {
        UserSchema.deleteOne(condition,function(error, response) {
            if(error) {
                var data = {
                    "error": error,
                    "timestamp": Date.now(),
                    "functionName": "deleteSingleUser",
                    "condition": condition
                };
                console.log('error', ' ', data);
                callback(false);
            } else {
                callback(response);
            }
        });
    },

    executeAggregate: function(condition, callback) { 
        UserSchema.aggregate(condition, function(error, userDetails) {
            if(userDetails.length > 0){
                callback(userDetails);
            } else {
                if(error) {
                    callback(false);
                    const data = {
                        "error": error,
                        "timestamp": Date.now(),
                        "functionName": "executeAggregate",
                        "condition": condition
                    };
                    console.log('error', ' ', data);
                } else {
                    callback(false);
                }
            }
        });
    },

    insertSingleTask: function(insertionValue, callback) {
        console.log(insertionValue);
        new TaskSchema(insertionValue).save(function(error, response) {
            if(error) {
                var data = {
                    "error": error,
                    "timestamp": Date.now(),
                    "functionName": "insertSingleUser",
                    "insertionValue": insertionValue
                };
                console.log('error', ' ', data);
                callback(false);
            } else {
                callback(response);
            }
        });
    },
};
