import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import NewsList from './features/News/components/NewsList.tsx';
import AddNews from './features/News/containers/AddNews.tsx';
import NewsPage from './features/News/containers/NewsPage.tsx';


const App = () => {

  return (
      <>
        <CssBaseline />
        <header>
          <AppToolbar />
        </header>
        <main>
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<NewsList />} />
              <Route path="/add-news" element={<AddNews />} />
              <Route path="/news/:id" element={<NewsPage/>} />
            </Routes>
          </Container>
        </main>
        </>
  )
};

export default App
