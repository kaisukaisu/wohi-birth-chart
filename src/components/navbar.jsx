import React from 'react';
import { NavLink } from "react-router";

function NavBar() {
    const navStyle = {
        backgroundColor: 'rgba(26, 26, 46, 0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(108, 92, 231, 0.2)',
        boxShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
        padding: '1rem 0'
    };

    const brandStyle = {
        color: '#f8f9fa',
        fontWeight: 600,
        fontSize: '1.3rem',
        textShadow: '0 0 10px rgba(108, 92, 231, 0.5)',
        textDecoration: 'none'
    };

    const baseLinkStyle = {
        color: '#e9ecef',
        transition: 'all 0.3s ease',
        padding: '0.5rem 1rem',
        borderRadius: '8px',
        margin: '0 0.25rem',
        textDecoration: 'none'
    };

    return (
        <nav className="navbar navbar-expand-lg" style={navStyle}>
            <a className="navbar-brand" href="#" style={brandStyle}>AstroKaisu</a>
            <button 
                className="navbar-toggler" 
                type="button" 
                data-toggle="collapse" 
                data-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation"
                style={{
                    border: '1px solid rgba(108, 92, 231, 0.3)',
                    borderRadius: '6px',
                    padding: '0.25rem 0.5rem'
                }}
            >
                <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
            </button>
      
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mx-auto">
                    <NavLink 
                        to="/yourchart" 
                        end 
                        className="nav-link"
                        style={({ isActive }) => ({
                            ...baseLinkStyle,
                            backgroundColor: isActive ? 'rgba(108, 92, 231, 0.2)' : 'transparent',
                            color: isActive ? '#a29bfe' : '#e9ecef'
                        })}
                    >
                        Your Chart
                    </NavLink>
                    <NavLink 
                        to="/interpretations"  
                        className="nav-link"
                        style={({ isActive }) => ({
                            ...baseLinkStyle,
                            backgroundColor: isActive ? 'rgba(108, 92, 231, 0.2)' : 'transparent',
                            color: isActive ? '#a29bfe' : '#e9ecef'
                        })}
                    >
                        Interpretations
                    </NavLink>
                    <NavLink 
                        to="/contact"  
                        className="nav-link"
                        style={({ isActive }) => ({
                            ...baseLinkStyle,
                            backgroundColor: isActive ? 'rgba(108, 92, 231, 0.2)' : 'transparent',
                            color: isActive ? '#a29bfe' : '#e9ecef'
                        })}
                    >
                        Contact
                    </NavLink>
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;
