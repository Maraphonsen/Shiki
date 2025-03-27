import React from 'react';
import { Link } from 'react-router-dom'; // Импортируем Link
import './Header.css';
import { useTheme } from '../hooks/Theme';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();

    return (
        <header>
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/shiki-logo.png" alt="Marvel logo" />
                </Link>
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
            </div>
        </header>
    );
}
export default Header;