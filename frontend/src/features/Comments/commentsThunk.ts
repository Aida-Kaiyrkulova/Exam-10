import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

export const getNewsById = async (id: string) => {
  const response = await axiosApi.get(`/news/${id}`);
  return response.data;
};

export const fetchComments = createAsyncThunk(
  'comments/fetchComments',
  async (newsId: string) => {
    const response = await axiosApi.get(`/comments?news_id=${newsId}`);
    return response.data as Comment[];
  }
);

export const addComment = createAsyncThunk(
  'comments/addComment',
  async (newComment: Omit<Comment, "id">) => {
    const response = await axiosApi.post('/comments', newComment);
    return response.data as Comment;
  }
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async (commentId: string) => {
    await axiosApi.delete(`/comments/${commentId}`);
    return commentId;
  }
);
