import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import {
  addComment,
  deleteComment,
  fetchComments,
  getNewsById,
} from "../../Comments/commentsThunk.ts";
import {
  selectCommentsItems,
  selectError,
  selectLoading,
} from "../../Comments/commentsSlice.ts";
import Grid from "@mui/material/Grid2";

const formatDateTime = (date: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(date).toLocaleString("ru-RU", options);
};

const NewsPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const comments = useAppSelector(selectCommentsItems);
  const loading = useAppSelector(selectLoading);
  const error = useAppSelector(selectError);
  const [news, setNews] = useState<any | null>(null);
  const [newComment, setNewComment] = useState<{
    author: string;
    text: string;
  }>({ author: "", text: "" });

  useEffect(() => {
    if (id) {
      getNewsById(id).then(setNews);
      dispatch(fetchComments(id));
    }
  }, [dispatch, id]);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && newComment.author && newComment.text) {
      dispatch(
        addComment({
          newsId: id,
          author: newComment.author,
          text: newComment.text,
        }),
      );
      setNewComment({ author: "", text: "" });
    }
  };

  const handleDeleteComment = (commentId: string) => {
    dispatch(deleteComment(commentId));
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{ padding: 2 }}>
      {news ? (
        <>
          <Typography variant="h3" sx={{ marginTop: 2, marginBottom: 3 }}>
            {news.title}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDateTime(news.date)}
          </Typography>
          <Typography variant="body1">{news.content}</Typography>

          {news.image ? (
            <img
              src={news.image}
              alt={news.title}
              style={{ width: "100%", height: "auto", marginTop: 20 }}
            />
          ) : (
            <Box
              sx={{
                width: "100%",
                height: 200,
                backgroundColor: "#f0f0f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant="h5">No image available</Typography>
            </Box>
          )}

          <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 5 }}>
            Comments:
          </Typography>

          {comments.map((comment) => (
            <Card key={comment.id} sx={{ marginBottom: 2 }}>
              <CardContent>
                <Grid
                  container
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Grid>
                    <Typography variant="subtitle1">
                      {comment.author}: {comment.text}
                    </Typography>
                  </Grid>
                  <Grid>
                    <Button
                      color="secondary"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}
        </>
      ) : (
        <Typography variant="h6">News not found</Typography>
      )}
      <form onSubmit={handleAddComment}>
        <Typography variant="h5" sx={{ marginTop: 3, marginBottom: 3 }}>
          Add new comment:
        </Typography>
        <TextField
          label="Author"
          value={newComment.author}
          onChange={(e) =>
            setNewComment({ ...newComment, author: e.target.value })
          }
          fullWidth
          margin="normal"
        />
        <TextField
          label="Comment"
          value={newComment.text}
          onChange={(e) =>
            setNewComment({ ...newComment, text: e.target.value })
          }
          fullWidth
          multiline
          rows={4}
          margin="normal"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Add Comment
        </Button>
      </form>

      {error && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {error}
        </Alert>
      )}
    </Box>
  );
};

export default NewsPage;
