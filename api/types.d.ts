export interface News {
    id: string;
    title: string;
    content: string;
    image: string | null;
    date: string;
}

export interface Comment {
    id: string;
    newsId: string;
    author: string;
    text: string;
}