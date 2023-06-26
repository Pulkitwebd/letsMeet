const express = require('express');
const router = express.Router();
const Comment = require('../Schemas/Comment');
const User = require('../Schemas/user');

// Create a comment
router.post('/comments', async (req, res) => {
  try {
    const { content, user, event, parentComment } = req.body;

    const newComment = new Comment({
      content,
      user,
      event,
      parentComment
    });

    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a reply to a comment
router.post('/comments/:commentId/replies', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content, user } = req.body;

    const parentComment = await Comment.findById(commentId);
    if (!parentComment) {
      return res.status(404).json({ error: 'Parent comment not found' });
    }

    const newReply = {
      content,
      user
    };

    parentComment.replies.push(newReply);
    const savedParentComment = await parentComment.save();
    res.status(201).json(savedParentComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Like a comment
router.post('/comments/:commentId/like', async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.likes.includes(userId)) {
      return res.status(400).json({ error: 'User has already liked the comment' });
    }

    comment.likes.push(userId);
    const savedComment = await comment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment
router.delete('/comments/:commentId', async (req, res) => {
  try {
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    if (comment.parentComment) {
      const parentComment = await Comment.findById(comment.parentComment);
      if (parentComment) {
        parentComment.replies = parentComment.replies.filter(reply => reply._id.toString() !== commentId);
        await parentComment.save();
      }
    }

    await comment.remove();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get comments for an event
router.get('/events/:eventId/comments', async (req, res) => {
  try {
    const { eventId } = req.params;

    const comments = await Comment.find({ event: eventId })
      .populate('user', 'firstname')
      .populate({
        path: 'replies.user',
        select: 'firstname'
      });

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
