import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useTheme } from '../hooks/Theme';

function Header() {
    const { isDarkTheme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className={isDarkTheme ? 'dark-header' : 'light-header'}>
            <div className="header-container">
                <Link to="/" className="logo">
                    <img src="/shiki-logo.png" alt="Shiki logo" />
                </Link>
                
                <nav className="desktop-nav">
                    <Link to="/animes" className="nav-link">
                        Animes
                    </Link>
                    <Link to="/mangas" className="nav-link">
                        Manga
                    </Link>
                    <Link to="/characters" className="nav-link">
                        Characters
                    </Link>
                    <Link to="/favorites" className="nav-link">
                        Favorites
                    </Link>
                    
                    <button 
                        className="theme-toggle-btn" 
                        onClick={toggleTheme}
                        aria-label={`Switch to ${isDarkTheme ? 'light' : 'dark'} mode`}
                    >
                        {isDarkTheme ? '☀️' : '🌙'}
                    </button>
                </nav>
                
                <button 
                    className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
                    <nav className="mobile-nav">
                        <Link to="/animes" className="mobile-nav-link" onClick={toggleMobileMenu}>
                            Animes
                        </Link>
                        <Link to="/mangas" className="mobile-nav-link" onClick={toggleMobileMenu}>
                            Manga
                        </Link>
                        <Link to="/characters" className="mobile-nav-link" onClick={toggleMobileMenu}>
                            Characters
                        </Link>
                        <Link to="/favourites" className="mobile-nav-link" onClick={toggleMobileMenu}>
                            Favorites
                        </Link>
                        
                        <button 
                            className="mobile-theme-toggle-btn" 
                            onClick={() => {
                                toggleTheme();
                                toggleMobileMenu();
                            }}
                        >
                            Switch to {isDarkTheme ? 'Light' : 'Dark'} Mode
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;