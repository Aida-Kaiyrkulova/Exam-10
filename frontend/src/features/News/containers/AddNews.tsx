import React, { useState } from 'react';
import axiosApi from '../../../axiosApi.ts';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button, CircularProgress } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput.tsx';
import Grid from '@mui/material/Grid2';

const AddNews: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (image) formData.append('image', image);

    setLoading(true);

    try {
      await axiosApi.post('/news', formData);
      navigate('/');
    } catch (error) {
      console.error('Error adding news:', error);
    } finally {
      setLoading(false);
    }
  };

  const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };


  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Add New Post
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Content"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />
        <Grid>
          <FileInput name="image" label="Image" onGetFile={fileEventChangeHandler} />
        </Grid>

        <Box>
          <Button type="submit" variant="contained" color="primary" disabled={loading}  sx={{ marginTop: 2 }}>
            {loading ? <CircularProgress size={24} /> : 'Add Post'}
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default AddNews;