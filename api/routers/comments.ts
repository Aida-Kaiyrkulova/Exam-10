import express from 'express';
import fileDb from '../fileDb';

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res) => {
    const { news_id } = req.query;

    if (news_id) {
        const comments = await fileDb.getComments(news_id as string);
        res.json(comments);
    } else {
        const comments = await fileDb.getComments();
        res.json(comments);
    }
});

commentsRouter.post('/', async (req, res) => {
    const { newsId, author, text } = req.body;

    if (!newsId || !text) {
       res.status(400).send({ message: 'News ID and text are required' });
        return;
    }

    try {
        const newComment = await fileDb.addComment({
            newsId,
            author: author || 'Anonymous',
            text
        });

        res.status(201).send(newComment);
    } catch (error) {
        console.error('Error adding comment:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

commentsRouter.delete('/:id', async (req, res) => {
    await fileDb.deleteComment(req.params.id);
    res.status(204).send();
});

export default commentsRouter;