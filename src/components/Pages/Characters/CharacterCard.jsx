// components/CharacterCard.jsx
import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

const CharacterCard = ({ character }) => {

  return (
    <div className="card character-card">
      <div className="card-poster">
        <img
          src={character.image?.original 
            ? `https://shikimori.one${character.image.original}` 
            : character.poster?.originalUrl
          }
          alt={character.russian || character.name}
        />
      </div>
      <div className="card-info">
        <h3>{character.russian || character.name}</h3>
        {character.name && character.russian && character.name !== character.russian && (
          <p className="original-title">{character.name}</p>
        )}
        <div className="card-meta">
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