// components/CharacterCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const CharacterCard = ({ character}) => {
  
  return (
    <div className="card character-card">
      <div className="card-poster">
        <img
          src={`https://shikimori.one${character.image?.original || character.image?.preview || ''}`}
          alt={character.russian || character.name}
          onError={(e) => {
            e.target.src = '/placeholder-character.jpg';
          }}
        />
      </div>
      <div className="card-info">
        <h3>{character.russian || character.name}</h3>
        {character.name && character.russian && character.name !== character.russian && (
          <p className="original-title">{character.name}</p>
        )}
        <div className="card-meta">
          <span className="alt-name">{character.altname || 'No alternative name'}</span>
        </div>
        <div className="card-description">
          {character.description && (
            <p className="description">
              {character.description.length > 100
                ? `${character.description.substring(0, 100)}...`
                : character.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    russian: PropTypes.string,
    altname: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.shape({
      original: PropTypes.string,
      preview: PropTypes.string,
    }),
  }).isRequired,
};

export default CharacterCard;