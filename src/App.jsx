import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import AnimePage from './components/Pages/Anime/AnimePage';
import MangaPage from './components/Pages/Manga/MangaPage';
import CharacterPage from './components/Pages/Characters/CharacterPage';
import Home from './components/Pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AnimeDetailPage from './components/Pages/Anime/AnimeDetailPage';
import MangaDetailPage from './components/Pages/Manga/MangaDetailPage';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-content">
          <Header />
          <Routes>
            <Route path="/animes" element={<AnimePage />} />
            <Route path="/anime/:id" element={<AnimeDetailPage />} />
            <Route path="/mangas" element={<MangaPage />} />
            <Route path="/manga/:id" element={<MangaDetailPage />} />
            <Route path="/characters" element={<CharacterPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;