// components/Pages/Favorites/Favorites.jsx
import React, { useState, useEffect } from 'react';
import { fetchFavorites } from '../../../API/shikimoriApi';
import AnimeCard from '../Anime/AnimeCard';
import MangaCard from '../Manga/MangaCard';
import CharacterCard from '../Characters/CharacterCard';
import '../styles/Card.css';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        const data = await fetchFavorites();
        setFavorites(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const handleFavoriteToggle = (id, isFavorite) => {
    if (!isFavorite) {
      setFavorites(prev => prev.filter(item => item.linked_id !== id));
    }
  };

  const renderFavoriteItem = (item) => {
    switch (item.linked_type) {
      case 'Anime':
        return (
          <AnimeCard 
            key={`anime-${item.linked_id}`} 
            anime={item.linked} 
            initialIsFavorite={true}
            onFavoriteToggle={handleFavoriteToggle}
          />
        );
      case 'Manga':
        return (
          <MangaCard 
            key={`manga-${item.linked_id}`} 
            manga={item.linked} 
            initialIsFavorite={true}
            onFavoriteToggle={handleFavoriteToggle}
          />
        );
      case 'Character':
        return (
          <CharacterCard 
            key={`character-${item.linked_id}`} 
            character={item.linked} 
            initialIsFavorite={true}
            onFavoriteToggle={handleFavoriteToggle}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="favorites-page">
      <h1 className="page-title">Избранное</h1>
      
      {loading && <div className="loading">Загрузка...</div>}
      {error && <div className="error">Ошибка: {error}</div>}

      <div className="favorites-grid">
        {favorites.length > 0 ? (
          favorites.map(renderFavoriteItem)
        ) : (
          !loading && <div className="empty-favorites">В избранном пока ничего нет</div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;