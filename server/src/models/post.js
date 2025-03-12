import { Schema, Types, model } from "mongoose";

const forumPostSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 100
    },
    content: {
        type: String,
        required: true,
        minLength: 20
    },
    author: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',  // Това ще сочи към модел User в MongoDB
        required: true
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: true
        },
        text: {
            type: String,
            required: true,
            minLength: 2
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Post = model('Post', forumPostSchema);

export default Post;
