const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchemaDetails = new Schema({
    displayName: String,
    email: {type: String, required: true},
    createdOn: { type: Number, default: Date.now },
    lastUpdatedOn: { type: Number, default: Date.now },
}, {
    collection: 'users'
});

module.exports =  mongoose.model('userSchema', userSchemaDetails);

