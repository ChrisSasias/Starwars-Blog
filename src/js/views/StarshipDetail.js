import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

function StarshipDetail() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.fetchStarshipDetails(id);
  }, [id]);

  if (!store.currentStarship) {
    return <div>Loading...</div>;
  }

  const { name, model, manufacturer, length, max_atmosphering_speed } = store.currentStarship;

  return (
    <div className="card mt-5" style={{ width: "30rem", margin: "auto" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/starships/${id}.jpg`}
        className="card-img-top"
        alt={name}
        style={{ height: "30rem" }}
      />
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
        <p className="card-text">Model: {model}</p>
        <p className="card-text">Manufacturer: {manufacturer}</p>
        <p className="card-text">Length: {length}</p>
        <p className="card-text">Max Atmosphering Speed: {max_atmosphering_speed}</p>
      </div>
    </div>
  );
}

export default StarshipDetail;