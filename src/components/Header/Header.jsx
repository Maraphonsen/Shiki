import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useTheme } from '../hooks/Theme';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="header">
            <div className="container">
                <Link to="/" className="logo">
                    <img src="/shiki-logo.png" alt="Shiki logo" />
                </Link>
                
                <button className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? '✕' : '☰'}
                </button>
                
                <nav className={`nav ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/animes" className="btnHeader" onClick={() => setIsMenuOpen(false)}>
                        Animes
                    </Link>
                    <Link to="/mangas" className="btnHeader" onClick={() => setIsMenuOpen(false)}>
                        Manga
                    </Link>
                    <Link to="/characters" className="btnHeader" onClick={() => setIsMenuOpen(false)}>
                        Characters
                    </Link>
                    <Link to="/favourites" className="btnHeader" onClick={() => setIsMenuOpen(false)}>
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