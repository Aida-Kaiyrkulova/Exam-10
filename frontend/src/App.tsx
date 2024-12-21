import { Container, CssBaseline } from '@mui/material';
import AppToolbar from './components/UI/AppToolbar/AppToolbar.tsx';
import { Route, Routes } from 'react-router-dom';
import NewsList from './features/News/components/NewsList.tsx';


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
            </Routes>
          </Container>
        </main>
        </>
  )
};

export default App
