// const constants = require('../../constants');
var payloadCheck = require('payload-validator');

module.exports = {
    /**
     * Function Name: validateUpdateMap
     * @param {* It contains the map id, type and data in it } payload 
     * Process: It validates the given payload and returns the response.
     * @param {* It returns true or error message } callback 
     */
    validateCreateUserPayload: function (payload) {
        var expectedPayload = {
            "email" : '',
            "displayName" : '',
        }
        var result = payloadCheck.validator(
            payload,
            expectedPayload,
            ['email']
        )
        if(result.success) {
            let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            let email = payload.email;
            if (email.match(regexEmail)) {
                return true; 
            } else {
                return false; 
            }
        }
        return result.success;
    }
}
