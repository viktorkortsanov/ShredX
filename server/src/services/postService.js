import Post from '../models/post.js'

const postService = {
    getAll() {
        return Post.find();
    },

    getOne(postId) {
        return Post.findById(postId);
    },

    create(postData, userId, auhtor) {
        return Post.create({ ...postData, owner: userId, author: auhtor.username});
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

    comment(postId, userId, content) {
        return Post.findByIdAndUpdate(postId, { $push: { comments: { userId, content, createdAt: new Date() } } });
    }
};

export default postService;
