// components/FavoriteButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import useFavorite from './useFavorite';

const FavoriteButton = ({ type, id, onToggle }) => {
  const { isFavorite, isLoading, toggleFavorite } = useFavorite(type, id);

  const handleClick = async () => {
    const success = await toggleFavorite();
    if (success && onToggle) {
      onToggle(id, !isFavorite);
    }
  };

  return (
    <button 
      onClick={handleClick}
      disabled={isLoading}
      className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
      aria-label={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  );
};

FavoriteButton.propTypes = {
  type: PropTypes.oneOf(['anime', 'manga', 'character']).isRequired,
  id: PropTypes.number.isRequired,
  onToggle: PropTypes.func,
};

FavoriteButton.defaultProps = {
  onToggle: null,
};

export default FavoriteButton;