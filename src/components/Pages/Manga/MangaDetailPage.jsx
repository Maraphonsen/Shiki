import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { fetchMangaById } from "../../../API/shikimoriApi";
import '../styles/MangaDetailPage.css'

const MangaDetailPage = () => {
    const { id } = useParams();
    const [manga, setManga] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            try {
                setLoading(true);
                const mangaData = await fetchMangaById(id);
                setManga(mangaData);
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
    if (!manga) return <div className="no-data">Манга не найдена</div>;

    return (
        <div className="manga-detail-container">
            {/* Шапка с основной информацией */}
            <div className="manga-header">
                <div className="manga-poster">
                    <img 
                        src={`https://shikimori.one${manga.image.original}`} 
                        alt={manga.russian || manga.name} 
                    />
                </div>
                
                <div className="manga-info">
                    <h1>{manga.russian || manga.name}</h1>
                    {manga.name && manga.russian && manga.name !== manga.russian && (
                        <h2 className="original-title">{manga.name}</h2>
                    )}
                    
                    <div className="manga-meta">
                        <span>Статус: {manga.status}</span>
                        <span>Томов: {manga.volumes || '?'}</span>
                        <span>Глав: {manga.chapters || '?'}</span>
                        <span>Рейтинг: ⭐ {manga.score || 'N/A'}</span>
                        <span>Год: {manga.airedOn?.year || 'Неизвестно'}</span>
                    </div>
                    
                    <div className="manga-genres">
                        {manga.genres?.map(genre => (
                            <span key={genre.id} className="genre-tag">
                                {genre.russian || genre.name}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            
            {/* Описание манги */}
            <div className="manga-description">
                <h2>Описание</h2>
                <p>{manga.description || 'Описание отсутствует'}</p>
            </div>
        </div>
    );
};

export default MangaDetailPage;