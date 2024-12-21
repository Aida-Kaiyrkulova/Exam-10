import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import { addComment, deleteComment, fetchComments } from './commentsThunk.ts';
import {Comment} from "../../types";

interface CommentsState {
  items: Comment[];
  loading: boolean;
  error: string | null;
}

const initialState: CommentsState = {
  items: [],
  loading: false,
  error: null,
};

export const selectCommentsItems = (state: RootState) => state.comments.items;
export const selectLoading = (state: RootState) => state.comments.loading;
export const selectError = (state: RootState) => state.comments.error;

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchComments.fulfilled, (state, { payload: items }) => {
        state.loading = false;
        state.items = [...items];
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addComment.fulfilled, (state) => {
        state.items = [...state.items];
      })
      .addCase(deleteComment.fulfilled, (state, action: PayloadAction<string>) => {
        state.items = state.items.filter(comment => comment.id !== action.payload);
      });
  },
});

export const commentsReducer = commentsSlice.reducer;
