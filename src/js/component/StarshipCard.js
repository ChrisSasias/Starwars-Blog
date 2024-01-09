import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";

function StarshipCard() {
  // Changed function name from PeopleCard to StarshipCard
  const { store, actions } = useContext(Context);
  const [activeFav, setActiveFav] = useState(false);

  useEffect(() => {
    actions.fetchStarShips();
  }, []);

  // You might need this in another project
  const handleFavorites = (starship) => {
    const isFavorite = store.favorites.some((fav) => fav.name === starship.name);
   
    if (isFavorite) {
      actions.removeFavorites(starship.name);
    } else {
      actions.addFavorites(starship.name, starship.id, "starship");
    }
  };
  return (
    <div
      className="d-flex col-10 overflow-auto mt-5 mx-auto cards"
      style={{ height: "50rem" }}
    >
      {store.starships.map((starship, index) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.name === starship.name && fav.type === "starship"
        );
        return (
          <div
            key={index}
            className="card col-1 mx-1"
            style={{ width: "30rem", height: "48rem" }}
          >
            <h3>{starship.name}</h3>
            <img
              src={`https://starwars-visualguide.com/assets/img/starships/${starship.id}.jpg`}
              className="card-img-top"
              alt={starship.name}
              style={{ height: "30rem", width: "30rem" }}
            />
            <p>Model: {starship.model}</p>
            <p>Manufacturer: {starship.manufacturer}</p>
            <p>Cost in Credits: {starship.cost_in_credits}</p>
            <p>Length: {starship.length}</p>
            <p>Max Atmosphering Speed: {starship.max_atmosphering_speed}</p>
            <Link to={`/StarshipDetail/${starship.id}`}>Learn More</Link>
            <button
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
              onClick={() => handleFavorites(starship)}
            ></button>
          </div>
        );
      })}
    </div>
      );
    }
    export default StarshipCard; // Changed export default from PeopleCard to StarshipCard