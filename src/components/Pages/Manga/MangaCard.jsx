import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';

const MangaCard = ({ manga }) => {
  const navigate = useNavigate();
  
  return (
    <div 
      className="card"
      onClick={() => navigate(`/manga/${manga.id}`)}
      style={{cursor: 'pointer'}}
    >
      <div className="card-poster">
        <img 
          src={`https://shikimori.one${manga.image?.original || manga.image?.preview || ''}`} 
          alt={manga.russian || manga.name}
          onError={(e) => {
            e.target.src = '/placeholder-manga.jpg';
          }}
        />
      </div>
      <div className="card-info">
        <h3>{manga.russian || manga.name}</h3>
        {manga.name && manga.russian && manga.name !== manga.russian && (
          <p className="original-title">{manga.name}</p>
        )}
        <div className="card-meta">
          <span className="score">⭐ {manga.score || 'N/A'}</span>
          <span className="status">{manga.status || 'Unknown'}</span>
          <span className="volumes">
            Томов: {manga.volumes || '?'}
          </span>
        </div>
        <div className="card-genres">
          {manga.genres?.slice(0, 3).map(genre => (
            <span key={genre.name} className="genre-tag">
              {genre.russian || genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};


MangaCard.propTypes = {
  manga: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // ... остальные propTypes
  }).isRequired,
  initialIsFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
};

MangaCard.defaultProps = {
  initialIsFavorite: false,
  onFavoriteToggle: null,
};

export default MangaCard;