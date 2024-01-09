import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import starWarsLogo from "/src/img/Star-Wars-logo.png";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const [favorites, setFavorites] = useState([]);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setFavorites(store.favorites);
  }, [store.favorites]);

  const handleMouseEnter = (event) => {
    const { clientX, clientY } = event;
    setTooltipPosition({ top: clientY + 10, left: clientX + 10 });
  };

  const handleDeleteClick = (event, name) => {
    event.stopPropagation();
    actions.removeFavorites(name);
  };

  return (
    <nav className="navbar bg-off-black">
      <div className="container-fluid d-flex align-items-center">
        <div className="d-flex align-items-center">
          <Link to="/" className="me-2">
            <span
              className="navbar-brand mb-0 h1"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={() => setTooltipPosition({ top: 0, left: 0 })}
            >
              <img
                src={starWarsLogo}
                alt="Star Wars Logo"
                style={{
                  width: '90px',
                  height: 'auto',
                  border: `2px solid black`,
                  transition: 'border-color 0.3s ease-in-out',
                  position: 'relative',
                }}
              />
              {tooltipPosition.top !== 0 && (
                <span
                  style={{
                    position: 'fixed',
                    top: `${tooltipPosition.top}px`,
                    left: `${tooltipPosition.left}px`,
                    backgroundColor: 'black',
                    color: 'white',
                    padding: '5px',
                    borderRadius: '5px',
                    zIndex: 9999,
                  }}
                >
                  Home
                </span>
              )}
            </span>
          </Link>
        </div>

        <div className="dropdown dropstart">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Favorites
          </button>
          <ul className="dropdown-menu">
            {favorites?.map((favorite) => (
              <li key={favorite.name} className="d-flex justify-content-between align-items-center">
                {favorite.type === "character" && (
                  <Link to={`/CharacterDetail/${favorite.id}`}>
                    {favorite.name}
                  </Link>
                )}
                {favorite.type === "starship" && (
                  <Link to={`/StarshipDetail/${favorite.id}`}>
                    {favorite.name}
                  </Link>
                )}
                {favorite.type === "planet" && (
                  <Link to={`/PlanetDetail/${favorite.id}`}>
                    {favorite.name}
                  </Link>
                )}
                <button onClick={(e) => handleDeleteClick(e, favorite.name)} style={{ cursor: 'pointer', border: 'none', backgroundColor: 'transparent', fontSize: '16px' }}>
                  &#10006;
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};


