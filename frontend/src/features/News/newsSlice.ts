import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { News } from '../../types';


interface NewsState {
  news: News[];
  loading: boolean;
  error: string | null;
}

const initialState: NewsState = {
  news: [],
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setNews: (state, action: PayloadAction<any[]>) => {
      state.news = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setNews, setLoading, setError } = newsSlice.actions;
export const newsReducer = newsSlice.reducer;