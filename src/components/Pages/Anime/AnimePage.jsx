// pages/AnimePage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/ListPage.css';
import AnimeCard from './AnimeCard';
import { fetchAnimeList } from '../../../API/shikimoriApi';

const AnimePage = () => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const loadAnime = async () => {
      try {
        setLoading(true);
        const data = await fetchAnimeList(searchTerm, limit);
        setAnimeList(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      loadAnime();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, limit]);

  return (
    <div className="list-container">
      <h1>Аниме</h1>
      
      <div className="search-controls">
        <input
          type="text"
          placeholder="Поиск аниме..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={limit} 
          onChange={(e) => setLimit(Number(e.target.value))}
          className="limit-select"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
      </div>

      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">Ошибка: {error}</div>}

      <div className="grid">
        {animeList.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>

      {!loading && animeList.length === 0 && (
        <div className="no-results">Ничего не найдено</div>
      )}
    </div>
  );
};

export default AnimePage;