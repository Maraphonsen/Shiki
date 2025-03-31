import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailsPage.css';

const CharacterDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [animeRoles, setAnimeRoles] = useState([]);
  const [mangaRoles, setMangaRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        setLoading(true);
        
        const characterQuery = `
          query ($id: ID!) {
            character(id: $id) {
              id
              name
              russian
              japanese
              poster { originalUrl mainUrl }
              description
              descriptionHtml
              
              animes {
                id
                rolesRu
                rolesEn
                anime {
                  id
                  name
                  russian
                  poster { originalUrl mainUrl }
                }
              }
              
              mangas {
                id
                rolesRu
                rolesEn
                manga {
                  id
                  name
                  russian
                  poster { originalUrl mainUrl }
                }
              }
            }
          }
        `;
        
        const response = await axios.post('https://shikimori.one/api/graphql', {
          query: characterQuery,
          variables: { id: parseInt(id) }
        });
        
        const characterData = response.data.data.character;
        setCharacter(characterData);
        
        if (characterData.animes) {
          setAnimeRoles(characterData.animes.map(role => ({
            ...role.anime,
            role: role.rolesRu || role.rolesEn
          })));
        }
        
        if (characterData.mangas) {
          setMangaRoles(characterData.mangas.map(role => ({
            ...role.manga,
            role: role.rolesRu || role.rolesEn
          })));
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCharacterDetails();
  }, [id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!character) return <div className="no-data">Персонаж не найден</div>;

  return (
    <div className="details-container">
      <div className="character-header">
        <div className="character-poster">
          <img 
            src={`https://shikimori.one${character.poster?.originalUrl || character.poster?.mainUrl}`} 
            alt={character.russian || character.name} 
          />
        </div>
        
        <div className="character-info">
          <h1>{character.russian || character.name}</h1>
          {character.name && character.russian && character.name !== character.russian && (
            <h2>{character.name}</h2>
          )}
          {character.japanese && <p>Японское: {character.japanese}</p>}
        </div>
      </div>
      
      <div className="character-description">
        <h3>Описание</h3>
        <div 
          dangerouslySetInnerHTML={{ __html: character.descriptionHtml || character.description }} 
        />
      </div>
      
      {animeRoles.length > 0 && (
        <div className="related-media">
          <h3>Появляется в аниме</h3>
          <div className="media-grid">
            {animeRoles.map(anime => (
              <div 
                key={anime.id} 
                className="media-item-card"
                onClick={() => navigate(`/anime/${anime.id}`)}
              >
                <img 
                  src={`https://shikimori.one${anime.poster?.originalUrl || anime.poster?.mainUrl}`} 
                  alt={anime.russian || anime.name}
                />
                <div className="media-item-info">
                  <h4>{anime.russian || anime.name}</h4>
                  <p>{anime.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {mangaRoles.length > 0 && (
        <div className="related-media">
          <h3>Появляется в манге</h3>
          <div className="media-grid">
            {mangaRoles.map(manga => (
              <div 
                key={manga.id} 
                className="media-item-card"
                onClick={() => navigate(`/manga/${manga.id}`)}
              >
                <img 
                  src={`https://shikimori.one${manga.poster?.originalUrl || manga.poster?.mainUrl}`} 
                  alt={manga.russian || manga.name}
                />
                <div className="media-item-info">
                  <h4>{manga.russian || manga.name}</h4>
                  <p>{manga.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterDetailsPage;