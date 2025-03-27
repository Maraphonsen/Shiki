import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchAnimeById } from "../../../API/shikimoriApi";
import '../styles/AnimeDetailPage.css'

const AnimeDetailPage = () => {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                // Загрузка основной инфы об аниме
                const animeData = await fetchAnimeById(id);
                setAnime(animeData);
            } catch(err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [id]);

    if (loading) return <div className="loading">Загрузка...</div>;
    if (error) return <div className="error">Ошибка: {error}</div>;
    if (!anime) return <div className="no-data">Аниме не найдено</div>;

    return (
        <div className="anime-detail-container">
            {/* Шапка с основной информацией */}
            <div className="anime-header">
                <div className="anime-poster">
                    <img 
                        src={`https://shikimori.one${anime.image.original}`} 
                        alt={anime.russian || anime.name} 
                    />
                </div>
                
                <div className="anime-info">
                    <h1>{anime.russian || anime.name}</h1>
                    {anime.name && anime.russian && anime.name !== anime.russian && (
                        <h2 className="original-title">{anime.name}</h2>
                    )}
                    
                    <div className="anime-meta">
                        <span>Статус: {anime.status}</span>
                        <span>Эпизоды: {anime.episodesAired}/{anime.episodes || '?'}</span>
                        <span>Рейтинг: ⭐ {anime.score || 'N/A'}</span>
                        <span>Год: {anime.airedOn?.year || 'Неизвестно'}</span>
                    </div>
                    
                    <div className="anime-genres">
                        {anime.genres?.map(genre => (
                            <span key={genre.id} className="genre-tag">
                                {genre.russian || genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Описание аниме */}
            <div className="anime-description">
                <h2>Описание</h2>
                <p>{anime.description || 'Описание отсутствует'}</p>
            </div>
        </div>
    );
};

export default AnimeDetailPage;