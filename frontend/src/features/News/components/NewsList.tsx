import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { RootState } from "../../../app/store.ts";
import { deleteNews, fetchNews } from "../newsThunk.ts";
import { News } from "../../../types";
import { Card, Typography, CardContent, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

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

const NewsList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { news, loading, error } = useAppSelector(
    (state: RootState) => state.news,
  );

  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteNews(id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 2,
        }}
      >
        <Typography variant="h4">Posts</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/add-news"
        >
          Add New Post
        </Button>
      </Box>

      {news.map((item: News) => (
        <Card key={item.id} sx={{ marginBottom: 2, padding: 2 }}>
          <CardContent>
            <Typography variant="h6">{item.title}</Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              sx={{ marginTop: 1 }}
            >
              {formatDateTime(item.date)}
            </Typography>
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                style={{ maxWidth: "100%", marginTop: 1 }}
              />
            )}
            <Typography variant="body1">{item.content}</Typography>
            <Button
              variant="text"
              component={Link}
              to={`/news/${item.id}`}
              sx={{ marginTop: 1 }}
            >
              Read Full Post &gt;&gt;
            </Button>
            <div>
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleDelete(item.id)}
                sx={{ marginTop: 1 }}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default NewsList;
