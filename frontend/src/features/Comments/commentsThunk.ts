import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { CommentMutation } from "../../types";

export const getNewsById = async (id: string) => {
  const response = await axiosApi.get(`/news/${id}`);
  return response.data;
};

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (newsId: string) => {
    const response = await axiosApi.get(`/comments?news_id=${newsId}`);
    return response.data as Comment[];
  },
);

export const addComment = createAsyncThunk<Comment, CommentMutation>(
  "comments/addComment",
  async (commentMutation) => {
    const response = await axiosApi.post("/comments", commentMutation);
    return response.data;
  },
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId: string) => {
    await axiosApi.delete(`/comments/${commentId}`);
    return commentId;
  },
);
