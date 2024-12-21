import { AppDispatch } from "../../app/store.ts";
import { setError, setLoading, setNews } from "./newsSlice.ts";
import axiosApi from "../../axiosApi.ts";
import { News } from "../../types";

export const fetchNews = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axiosApi.get<News[]>("/news");
    dispatch(setNews(response.data));
  } catch (err) {
    dispatch(setError("Failed to load news"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteNews =
  (id: string) => async (dispatch: AppDispatch, getState: any) => {
    try {
      await axiosApi.delete(`/news/${id}`);
      const updatedNews = getState().news.news.filter(
        (news: News) => news.id !== id,
      );
      dispatch(setNews(updatedNews));
    } catch (err) {
      dispatch(setError("Failed to delete news"));
    }
  };
