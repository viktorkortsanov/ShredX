import Post from '../models/post.js'

const postService = {
    getAll() {
        return Post.find();
    },

    getOne(postId) {
        return Post.findById(postId);
    },

    create(postData, userId, auhtor) {
        return Post.create({ ...postData, owner: userId, author: auhtor.username });
    },

    delete(postId) {
        return Post.findByIdAndDelete(postId);
    },

    edit(postId, postData) {
        return Post.findByIdAndUpdate(postId, postData, { runValidators: true });
    },

    like(postId, userId) {
        return Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
    },

    unlike(postId, userId) {
        return Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
    },

    comment(postId, userId, author, content) {
        return Post.findByIdAndUpdate(postId, { $push: { comments: { owner: userId, author: author.username, content: content } } });
    },

    editComment(postId, commentId, content) {
        return Post.findOneAndUpdate(
            { _id: postId, 'comments._id': commentId },
            { $set: { 'comments.$.content': content } },
        );
    },

    deleteComment(postId, commentId) {
        return Post.findOneAndUpdate(
            { _id: postId, 'comments._id': commentId },
            { $pull: { comments: { _id: commentId } } },
        );
    }
};

export default postService;