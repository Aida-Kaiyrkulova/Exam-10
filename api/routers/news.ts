import express from "express";
import fileDb from "../fileDb";
import {imagesUpload} from "../multer";

const newsRouter = express.Router();

newsRouter.get('/', async (req, res) => {
    const news = await fileDb.getNews();
    res.send(news);
});

newsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(400).send({ error: 'Title and content are required' });
        return;
    }

    const image =  req.file? '/images/' + req.file.filename : null;
    const newNews = await fileDb.addNews({ title, content, image });
    res.send(newNews);
});

newsRouter.get('/:id', async (req, res) => {
    try {
        const news = await fileDb.getNews();
        const newsFindById = news.find(news => news.id === req.params.id);

        if (!newsFindById) {
            res.status(404).send({ message: 'News not found' });
            return;
        }

        res.send(newsFindById);
    } catch (error) {
        console.error("Error fetching news:", error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

newsRouter.delete('/:id', async (req, res) => {
    await fileDb.deleteNews(req.params.id);
    res.status(204).send();
});

export default newsRouter;