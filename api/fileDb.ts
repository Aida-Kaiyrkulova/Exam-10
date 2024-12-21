import {promises as fs} from 'fs';
import {News, Comment} from "./types";
import crypto from "crypto";

const fileName = './db.json';
let data: { news: News[], comments: Comment[] } = { news: [], comments: [] };

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            if (!fileContent) {
                data = { news: [], comments: [] };
                console.log('Initialized empty data:', data);
            } else {
                data = JSON.parse(fileContent.toString());
                console.log('Data after parsing:', data);
            }
        } catch (e) {
            console.error("Error loading file:", e);
            data = { news: [], comments: [] };
            console.log('Initialized empty data (error case):', data);
        }
    },
    async getNews() {
        if (!data || !data.news) {
            console.error("Data or news field is undefined");
            return [];
        }
        return data.news;
    },
    async addNews(item: Omit<News, 'id' | 'date'>) {
        const id = crypto.randomUUID();
        const date = new Date().toISOString();
        const newNews = { id, date, ...item };
        data.news.push(newNews);
        await this.save();
        return newNews;
    },
    async deleteNews(id: string) {
        data.news = data.news.filter(news => news.id !== id);
        data.comments = data.comments.filter(comment => comment.newsId !== id);
        await this.save();
    },
    async getComments(newsId?: string) {
        return newsId
            ? data.comments.filter(comment => comment.newsId === newsId)
            : data.comments;
    },

    async addComment(item: Omit<Comment, 'id'>) {
        const id = crypto.randomUUID();
        const newComment = { id, ...item };
        data.comments.push(newComment);
        await this.save();
        return newComment;
    },
    async deleteComment(id: string) {
        data.comments = data.comments.filter(comment => comment.id !== id);
        await this.save();
    },
    async save() {
        try {
            await fs.writeFile(fileName, JSON.stringify(data));
        } catch (e) {
            console.error("Error saving data:", e);
        }
    }
};

export default fileDb;