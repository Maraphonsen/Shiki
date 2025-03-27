import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useTheme } from '../hooks/Theme';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/shiki-logo.png" alt="Shiki logo" />
                </Link>
                
                {/* Бургер-кнопка */}
                <button 
                    className={`menu-toggle ${isModalOpen ? 'active' : ''}`} 
                    onClick={toggleModal}
                    aria-label="Toggle menu"
                >
                    <div className="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
                
                {/* Основное меню для десктопа */}
                <nav className="nav">
                    <Link to="/animes" className="btnHeader">
                        Animes
                    </Link>
                    <Link to="/mangas" className="btnHeader">
                        Manga
                    </Link>
                    <Link to="/characters" className="btnHeader">
                        Characters
                    </Link>
                    <Link to="/favourites" className="btnHeader">
                        Favorites
                    </Link>
                    
                    <div className="theme-toggle-container">
                        <label className="theme-switch">
                            <input 
                                type="checkbox" 
                                checked={isDarkTheme} 
                                onChange={toggleTheme}
                            />
                            <span className="slider"></span>
                        </label>
                    </div>
                </nav>
                
                {/* Модальное окно для мобильных */}
                {isModalOpen && (
                    <div className="mobile-modal">
                        <div className="mobile-modal-content">
                            <nav className="mobile-nav">
                                <Link to="/animes" className="mobile-btn" onClick={closeModal}>
                                    Animes
                                </Link>
                                <Link to="/mangas" className="mobile-btn" onClick={closeModal}>
                                    Manga
                                </Link>
                                <Link to="/characters" className="mobile-btn" onClick={closeModal}>
                                    Characters
                                </Link>
                                <Link to="/favourites" className="mobile-btn" onClick={closeModal}>
                                    Favorites
                                </Link>
                                
                                <div className="mobile-theme-toggle">
                                    <label className="theme-switch">
                                        <input 
                                            type="checkbox" 
                                            checked={isDarkTheme} 
                                            onChange={toggleTheme}
                                        />
                                        <span className="slider"></span>
                                    </label>
                                    <span>{isDarkTheme ? 'Dark' : 'Light'} Mode</span>
                                </div>
                            </nav>
                            <button className="close-modal" onClick={closeModal}>
                                ✕
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;