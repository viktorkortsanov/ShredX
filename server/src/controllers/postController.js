import { Router } from "express";
import postService from "../services/postService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import User from "../models/user.js";
import Post from "../models/post.js";

const postController = Router();

postController.get('/forum', async (req, res) => {
    try {
        const posts = await postService.getAll().lean();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts.' });
    }
});

postController.get('/forum/:postId', async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId).lean();
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post.' });
    }
})

postController.get('/forum/:postId/details', async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId).lean();
        const isOwner = post.owner.toString() === req.user?._id;
        res.json({ post, isOwner });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post details.' });
    }
});

postController.post('/forum/:postId/like', isAuth, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await postService.getOne(postId);

        if (post.likes.includes(userId)) {
            return res.status(400).json({ error: 'You have already liked this post.' });
        }

        await postService.like(postId, userId);
        res.status(200).json({ message: 'Post liked successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to like post.' });
    }
});

postController.post('/forum/:postId/like-toggle', isAuth, async (req, res) => {
    const postId = req.params.postId;
    const userId = req.user._id;

    try {
        const post = await postService.getOne(postId);
        if (post.likes.includes(userId)) {
            await postService.unlike(postId, userId);
            return res.status(200).json({ message: 'Post unliked successfully.' });
        } else {
            await postService.like(postId, userId);
            return res.status(200).json({ message: 'Post liked successfully.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to toggle like on post.' });
    }
});

postController.post(`/forum/:postId/comment/:commentId/like`, isAuth, async (req, res) => {
    const { postId, commentId } = req.params;
    const userId = req.user._id;

    try {
        const post = await postService.getOne(postId);
        const comment = post.comments.find(c => c._id.toString() === commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.likes.includes(userId)) {
            await postService.unlikeComment(postId, commentId, userId);
            return res.status(200).json({ message: "Comment unliked successfully." });
        } else {
            await postService.likeComment(postId, commentId, userId);
            return res.status(200).json({ message: "Comment liked successfully." });
        }
    } catch (err) {
        res.status(500).json({ error: "Failed to like/unlike comment." });
    }
});


postController.post('/forum/:postId/comment', isAuth, async (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;
    const userId = req.user._id;
    const author = await User.findById(userId);

    try {
        const updatedPost = await postService.comment(postId, userId, author, content);
        if (!updatedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        res.status(200).json({ message: 'Comment added successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add comment.' });
    }
});

postController.post('/forum/:postId/comment/:commentId/edit', isAuth, async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { content } = req.body;
    console.log(commentId);

    try {
        await postService.editComment(postId, commentId, content);
        res.status(200).json({ message: 'Comment updated successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update comment.' });
    }
});

postController.get('/forum/:postId/comment/:commentId/delete', isAuth, async (req, res) => {
    const { postId, commentId } = req.params;
    console.log(postId, commentId);


    try {
        await postService.deleteComment(postId, commentId);
        res.status(200).json({ message: 'Comment deleted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to delete comment.' });
    }
});

postController.get('/forum/:postId/delete', isAuth, async (req, res) => {
    if (!isPostOwner(req.params.postId, req.user?._id)) {
        return res.status(403).json({ error: 'Not authorized to delete this post.' });
    }

    try {
        await postService.delete(req.params.postId);
        res.status(200).json({ message: 'Post deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete post.' });
    }
});

postController.get('/forum/:postId/edit', isAuth, async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId).lean();
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post.' });
    }
});


postController.post('/forum/:postId/edit', isAuth, async (req, res) => {
    const postData = req.body;
    const postId = req.params.postId;

    if (!isPostOwner(postId, req.user?._id)) {
        return res.status(403).json({ error: 'Not authorized to edit this post.' });
    }

    try {
        await postService.edit(postId, postData);
        res.status(200).json({ message: 'Post updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update post.' });
    }
});

postController.post('/create', isAuth, async (req, res) => {
    const postData = req.body;
    const userId = req.user._id;

    try {
        const auhtor = await User.findById(userId);
        await postService.create(postData, userId, auhtor);
        res.status(201).json({ message: 'Post created successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create post.' });
    }
});

postController.get('/user/posts', isAuth, async (req, res) => {
    try {
        const userId = req.user._id;;
        const posts = await Post.find({ owner: userId }).lean();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user posts' });
    }
});

postController.get('/user/posts/liked', isAuth, async (req, res) => {
    try {
        const userId = req.user._id;
        const likedPosts = await Post.find({ likes: userId }).lean();
        res.json(likedPosts);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching liked posts' });
    }
});

async function isPostOwner(postId, userId) {
    const post = await postService.getOne(postId);
    return post.owner.toString() === userId;
}

export default postController;