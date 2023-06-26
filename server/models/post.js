const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = new Sechma ({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
});

module.export = mongoose.model('Post', PostSchema)
