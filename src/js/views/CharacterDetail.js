import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

function CharacterDetail() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.fetchPersonDetails(id);
  }, [id]);

  if (!store.currentPerson) {
    return <div>Loading...</div>;
  }

  const { name, height, mass, hair_color, skin_color, eye_color } =
    store.currentPerson;

  return (
    <div className="card mt-5" style={{ width: "30rem", margin: "auto" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`}
        className="card-img-top"
        alt={name}
        style={{ height: "30rem" }}
      />
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
        <p className="card-text">Height: {height}</p>
        <p className="card-text">Mass: {mass}</p>
        <p className="card-text">Hair Color: {hair_color}</p>
        <p className="card-text">Skin Color: {skin_color}</p>
        <p className="card-text">Eye Color: {eye_color}</p>
      </div>
    </div>
  );
}

export default CharacterDetail;