const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});
const blogPostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    },
    comments: [commentSchema],
    isPublished: {
        type: Boolean,
        default: true
    },
    allowComments: {
        type: Boolean,
        default: true
    }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = {BlogPost};
