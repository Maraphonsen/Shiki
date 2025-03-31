import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/DetailsPage.css';

const MangaDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [manga, setManga] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [relatedAnime, setRelatedAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMangaDetails = async () => {
      try {
        setLoading(true);
        
        const mangaQuery = `
          query ($id: ID!) {
            manga(id: $id) {
              id
              name
              russian
              english
              japanese
              kind
              score
              status
              volumes
              chapters
              airedOn { year month day date }
              poster { originalUrl mainUrl }
              description
              descriptionHtml
              genres { id name russian }
              publishers { id name }
              
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
                anime {
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
          query: mangaQuery,
          variables: { id: parseInt(id) }
        });
        
        const mangaData = response.data.data.manga;
        setManga(mangaData);
        
        if (mangaData.characterRoles) {
          setCharacters(mangaData.characterRoles.map(role => ({
            ...role.character,
            role: role.rolesRu || role.rolesEn
          })));
        }
        
        if (mangaData.related) {
          setRelatedAnime(mangaData.related
            .filter(item => item.anime)
            .map(item => ({
              ...item.anime,
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
    
    fetchMangaDetails();
  }, [id]);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!manga) return <div className="no-data">Манга не найдена</div>;

  return (
    <div className="details-container">
      <div className="media-header">
        <div className="media-poster">
          <img 
            src={`https://shikimori.one${manga.poster?.originalUrl || manga.poster?.mainUrl}`} 
            alt={manga.russian || manga.name} 
          />
        </div>
        
        <div className="media-info">
          <h1>{manga.russian || manga.name}</h1>
          {manga.name && manga.russian && manga.name !== manga.russian && (
            <h2>{manga.name}</h2>
          )}
          {manga.english && <p>Английское: {manga.english}</p>}
          {manga.japanese && <p>Японское: {manga.japanese}</p>}
          
          <div className="media-meta">
            <p><strong>Тип:</strong> {manga.kind}</p>
            <p><strong>Рейтинг:</strong> {manga.score} ⭐</p>
            <p><strong>Статус:</strong> {manga.status}</p>
            <p><strong>Томов:</strong> {manga.volumes || '?'}</p>
            <p><strong>Глав:</strong> {manga.chapters || '?'}</p>
            <p><strong>Дата выхода:</strong> {manga.airedOn?.date || 'Неизвестно'}</p>
            
            {manga.publishers?.length > 0 && (
              <p>
                <strong>Издатели:</strong> {manga.publishers.map(p => p.name).join(', ')}
              </p>
            )}
            
            {manga.genres?.length > 0 && (
              <p>
                <strong>Жанры:</strong> {manga.genres.map(g => g.russian || g.name).join(', ')}
              </p>
            )}
          </div>
        </div>
      </div>
      
      <div className="media-description">
        <h3>Описание</h3>
        <div 
          dangerouslySetInnerHTML={{ __html: manga.descriptionHtml || manga.description }} 
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
      
      {relatedAnime.length > 0 && (
        <div className="related-media">
          <h3>Связанные аниме</h3>
          <div className="media-grid">
            {relatedAnime.map(anime => (
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
                  <p>{anime.relation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaDetailsPage;