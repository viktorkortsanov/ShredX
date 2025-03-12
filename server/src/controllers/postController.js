import { Router } from "express";
import postService from "../services/postService.js";
import { isAuth } from "../middlewares/authMiddleware.js";

const postController = Router();

postController.get('/posts', async (req, res) => {
    try {
        const posts = await postService.getAll().lean();
        res.json({ posts });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts.' });
    }
});

postController.get('/posts/:postId/details', async (req, res) => {
    try {
        const post = await postService.getOne(req.params.postId).lean();
        const isOwner = post.owner.toString() === req.user?._id;
        res.json({ post, isOwner });
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post details.' });
    }
});

postController.post('/posts/:postId/like', isAuth, async (req, res) => {
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

postController.post('/posts/:postId/comment', isAuth, async (req, res) => {
    const postId = req.params.postId;
    const { content } = req.body;
    const userId = req.user._id;

    if (!content.trim()) {
        return res.status(400).json({ error: 'Comment content is required.' });
    }

    try {
        await postService.comment(postId, userId, content);
        res.status(200).json({ message: 'Comment added successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to add comment.' });
    }
});

postController.delete('/posts/:postId/delete', isAuth, async (req, res) => {
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

postController.put('/posts/:postId/edit', isAuth, async (req, res) => {
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
        await postService.create(postData, userId);
        res.status(201).json({ message: 'Post created successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Failed to create post.' });
    }
});

async function isPostOwner(postId, userId) {
    const post = await postService.getOne(postId);
    return post.owner.toString() === userId;
}

export default postController;
