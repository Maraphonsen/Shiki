import React, { useState, useEffect } from 'react';
import '../styles/ListPage.css';
import CharacterCard from './CharacterCard';
import { fetchCharacterList } from '../../../API/shikimoriApi';

const CharacterPage = () => {
  const [characterList, setCharacterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [limit, setLimit] = useState(20);

  useEffect(() => {
    const loadCharacters = async () => {
      try {
        setLoading(true);
        // Используем searchTerm или пустую строку
        const data = await fetchCharacterList(searchTerm, limit);
        setCharacterList(data || []); // На случай если API вернет null/undefined
        setError(null);
      } catch (err) {
        console.error('Error loading characters:', err);
        setError(err.message);
        setCharacterList([]);
      } finally {
        setLoading(false);
      }
    };

    loadCharacters(); // Загружаем сразу при монтировании

    // Добавляем debounce только для поиска
    const debounceTimer = searchTerm ? setTimeout(loadCharacters, 500) : null;
    
    return () => {
      if (debounceTimer) clearTimeout(debounceTimer);
    };
  }, [searchTerm, limit]);

  return (
    <div className="list-container">
      <h1>Персонажи</h1>
      
      <div className="search-controls">
        <input
          type="text"
          placeholder="Поиск персонажей..."
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
        {characterList.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>

      {!loading && characterList.length === 0 && (
        <div className="no-results">Ничего не найдено</div>
      )}
    </div>
  );
};

export default CharacterPage;