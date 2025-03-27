// pages/MangaPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/ListPage.css';
import MangaCard from './MangaCard';
import { fetchMangaList } from '../../../API/shikimoriApi';

const MangaPage = () => {
  const [mangaList, setMangaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const loadManga = async () => {
      try {
        setLoading(true);
        const data = await fetchMangaList(searchTerm, limit);
        setMangaList(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceTimer = setTimeout(() => {
      loadManga();
    }, 500);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, limit]);

  return (
    <div className="list-container">
      <h1>Манга</h1>
      
      <div className="search-controls">
        <input
          type="text"
          placeholder="Поиск манги..."
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
        {mangaList.map((manga) => (
          <MangaCard key={manga.id} manga={manga} />
        ))}
      </div>

      {!loading && mangaList.length === 0 && (
        <div className="no-results">Ничего не найдено</div>
      )}
    </div>
  );
};

export default MangaPage;