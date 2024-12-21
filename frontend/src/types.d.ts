export interface News {
  id: string;
  date: string;
  title: string;
  content: string;
  image: string | null;
}

export interface Comment {
  id: string;
  newsId: string;
  author: string;
  text: string;
}

export interface CommentMutation {
  newsId: string;
  author: string;
  text: string;
}
