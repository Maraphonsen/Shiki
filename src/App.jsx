import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/App.css';
import AnimePage from './components/Pages/Anime/AnimePage';
import MangaPage from './components/Pages/Manga/MangaPage';
import CharacterPage from './components/Pages/Characters/CharacterPage';
import Home from './components/Pages/Home/Home';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import AnimeDetailsPage from './components/Pages/Anime/AnimeDetailsPage';
import MangaDetailsPage from './components/Pages/Manga/MangaDetailsPage';
import CharacterDetailsPage from './components/Pages/Characters/CharacterDetailsPage';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="app-content">
          <Header />
          <Routes>
            <Route path="/animes" element={<AnimePage />} />
            <Route path="/mangas" element={<MangaPage />} />
            <Route path="/characters" element={<CharacterPage />} />
            <Route path="/animes/:id" element={<AnimeDetailsPage />} />
            <Route path="/mangas/:id" element={<MangaDetailsPage />} />
            <Route path="/characters/:id" element={<CharacterDetailsPage />} />
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;