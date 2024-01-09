import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/home.css";
import { Context } from "../store/appContext";
function PeopleCard() {
  const { store, actions } = useContext(Context);
  const [people, setPeople] = useState([]);
  // Fetch people on component mount
  useEffect(() => {
    actions.fetchPeople();
  }, []);
  useEffect(() => {
    setPeople(store.people);
  }, [store.people]);

  // Handling the favorites toggle
  const handleFavorites = (person) => {
    const isFavorite = store.favorites.some((fav) => fav.name === person.name);
    
    if (isFavorite) {
      actions.removeFavorites(person.name); // Make sure this correctly identifies the person to remove
    } else {
      actions.addFavorites(person.name, person.id, "character");
    }
  };

  return (
    <div
      className="d-flex col-10 overflow-auto mt-5 mx-auto cards"
      style={{ height: "50rem" }}
    >
      {people.map((person, index) => {
        const isFavorite = store.favorites.some(
          (fav) => fav.name === person.name && fav.type === "character"
        );
        return (
          <div
            key={index}
            className="card col-1 mx-1"
            style={{ width: "30rem", height: "48rem" }}
          >
            <h3>{person.name}</h3>
            <img
              src={`https://starwars-visualguide.com/assets/img/characters/${person.id}.jpg`}
              className="card-img-top"
              alt={person.name}
              style={{ height: "30rem", width: "30rem" }}
            />
            <p>Height: {person.height}</p>
            <p>Mass: {person.mass}</p>
            <p>Hair Color: {person.hair_color}</p>
            <p>Skin Color: {person.skin_color}</p>
            <p>Eye Color: {person.eye_color}</p>
            <Link to={`/CharacterDetail/${person.id}`}>Learn More</Link>
            <button
              className={isFavorite ? "fas fa-heart" : "far fa-heart"}
              onClick={() => handleFavorites(person)}
            >
              {" "}
            </button>
          </div>
        );
      })}
      </div>
    );
  }
  export default PeopleCard;