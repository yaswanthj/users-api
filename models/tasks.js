const mongoose = require('mongoose');
const { Schema } = mongoose;

const taskSchemaDetails = new Schema({
    text: {type: String, required: true},
    type: String,
    userID: mongoose.Schema.Types.ObjectId,
    createdOn: { type: Number, default: Date.now },
    lastUpdatedOn: { type: Number, default: Date.now },
}, {
    collection: 'tasks'
});

mongoose.model('taskSchema', taskSchemaDetails);

