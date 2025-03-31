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
           src={manga.image?.original 
            ? `https://shikimori.one${manga.image.original}` 
            : manga.poster?.originalUrl
          }
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
            <span key={genre.id} className="genre-tag">
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
    name: PropTypes.string,
    russian: PropTypes.string,
    score: PropTypes.number,
    status: PropTypes.string,
    volumes: PropTypes.number,
    poster: PropTypes.shape({
      originalUrl: PropTypes.string,
      mainUrl: PropTypes.string
    }),
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        russian: PropTypes.string
      })
    )
  }).isRequired
};

export default MangaCard;