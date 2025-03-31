import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import { useNavigate } from 'react-router-dom';

const AnimeCard = ({ anime}) => {
  const navigate = useNavigate();
  return (
    <div
    className='card'
    onClick={() => navigate(`/anime/${anime.id}`)}
    style={{cursor: 'pointer'}}
    >
    <div className="card">
      <div className="card-poster">
        <img 
          src={anime.image?.original
            ?`https://shikimori.one${anime.image.original}`
          : anime.poster?.originalUrl
          } 
          alt={anime.russian || anime.name}
          />
       
      </div>
      <div className="card-info">
        <h3>{anime.russian || anime.name}</h3>
        {anime.name && anime.russian && anime.name !== anime.russian && (
          <p className="original-title">{anime.name}</p>
        )}
        <div className="card-meta">
          <span className="score">⭐ {anime.score || 'N/A'}</span>
          <span className="status">{anime.status || 'Unknown'}</span>
          <span className="episodes">
            {anime.episodesAired || 0}/{anime.episodes || '?'}
          </span>
        </div>
        <div className="card-genres">
          {anime.genres?.slice(0, 3).map(genre => (
            <span key={genre.name} className="genre-tag">
              {genre.russian || genre.name}
            </span>
          ))}
        </div>
      </div>
    </div>
</div>
  );
};

AnimeCard.propTypes = {
  anime: PropTypes.shape({
    id: PropTypes.number.isRequired,
    // ... остальные propTypes
  }).isRequired,
  initialIsFavorite: PropTypes.bool,
  onFavoriteToggle: PropTypes.func,
};

AnimeCard.defaultProps = {
  initialIsFavorite: false,
  onFavoriteToggle: null,
};

export default AnimeCard;