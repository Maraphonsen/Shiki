// pages/AnimeDetailsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailsPage.css';

const AnimeDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [relatedManga, setRelatedManga] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        setLoading(true);
        
        // Запрос на получение информации об аниме
        const animeQuery = `
          query ($id: ID!) {
            animes(id: $id) {
              id
              name
              russian
              english
              japanese
              kind
              score
              status
              episodes
              episodesAired
              duration
              rating
              airedOn { year month day date }
              releasedOn { year month day date }
              poster { originalUrl mainUrl }
              description
              descriptionHtml
              genres { id name russian }
              studios { id name }
              
              characterRoles {
                id
                rolesRu
                rolesEn
                character {
                  id
                  name
                  russian
                  poster { originalUrl mainUrl }
                }
              }
              
              related {
                id
                relation
                relationRussian
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
          query: animeQuery,
          variables: { id: parseInt(id) }
        });
        
        const animeData = response.data.data.anime;
        setAnime(animeData);
        
        // Извлекаем персонажей
        if (animeData.characterRoles) {
          setCharacters(animeData.characterRoles.map(role => ({
            ...role.character,
            role: role.rolesRu || role.rolesEn
          })));
        }
        
        // Извлекаем связанную мангу
        if (animeData.related) {
          setRelatedManga(animeData.related
            .filter(item => item.manga)
            .map(item => ({
              ...item.manga,
              relation: item.relationRussian || item.relation
            })));
        }
        
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnimeDetails();
  }, [id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!anime) return <div className="no-data">Аниме не найдено</div>;

  return (
    <div className="anime-details-container">
      <div className="anime-header">
        <div className="anime-poster">
          <img 
            src={`https://shikimori.one${anime.poster?.originalUrl || anime.poster?.mainUrl}`} 
            alt={anime.russian || anime.name} 
          />
        </div>
        
        <div className="anime-info">
          <h1>{anime.russian || anime.name}</h1>
          {anime.name && anime.russian && anime.name !== anime.russian && (
            <h2>{anime.name}</h2>
          )}
          {anime.english && <p>Английское: {anime.english}</p>}
          {anime.japanese && <p>Японское: {anime.japanese}</p>}
          
          <div className="anime-meta">
            <p><strong>Тип:</strong> {anime.kind}</p>
            <p><strong>Рейтинг:</strong> {anime.score} ⭐</p>
            <p><strong>Статус:</strong> {anime.status}</p>
            <p><strong>Эпизоды:</strong> {anime.episodesAired || 0}/{anime.episodes || '?'}</p>
            <p><strong>Длительность:</strong> {anime.duration} мин.</p>
            <p><strong>Возрастной рейтинг:</strong> {anime.rating}</p>
            <p><strong>Дата выхода:</strong> {anime.airedOn?.date || 'Неизвестно'}</p>
            
            {anime.studios?.length > 0 && (
              <p>
                <strong>Студия:</strong> {anime.studios.map(s => s.name).join(', ')}
              </p>
            )}
            
            {anime.genres?.length > 0 && (
              <p>
                <strong>Жанры:</strong> {anime.genres.map(g => g.russian || g.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="anime-description">
        <h3>Описание</h3>
        <div 
          dangerouslySetInnerHTML={{ __html: anime.descriptionHtml || anime.description }} 
        />
      </div>
      
      {characters.length > 0 && (
        <div className="related-characters">
          <h3>Персонажи</h3>
          <div className="characters-grid">
            {characters.map(character => (
              <div 
                key={character.id} 
                className="character-card"
                onClick={() => navigate(`/characters/${character.id}`)}
              >
                <img 
                  src={`https://shikimori.one${character.poster?.originalUrl || character.poster?.mainUrl}`} 
                  alt={character.russian || character.name}
                />
                <div className="character-info">
                  <h4>{character.russian || character.name}</h4>
                  <p>{character.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {relatedManga.length > 0 && (
        <div className="related-manga">
          <h3>Связанная манга</h3>
          <div className="manga-grid">
            {relatedManga.map(manga => (
              <div 
                key={manga.id} 
                className="manga-card"
                onClick={() => navigate(`/manga/${manga.id}`)}
              >
                <img 
                  src={`https://shikimori.one${manga.poster?.originalUrl || manga.poster?.mainUrl}`} 
                  alt={manga.russian || manga.name}
                />
                <div className="manga-info">
                  <h4>{manga.russian || manga.name}</h4>
                  <p>{manga.relation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimeDetailsPage;