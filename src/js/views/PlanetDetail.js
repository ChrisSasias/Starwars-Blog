import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

function PlanetDetail() {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.fetchPlanetDetail(id);
  }, [id]);

  if (!store.currentPlanet) {
    return <div>Loading...</div>;
  }

  const { name, population, terrain, climate, gravity } = store.currentPlanet;

  return (
    <div className="card mt-5" style={{ width: "30rem", margin: "auto" }}>
      <img
        src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`}
        className="card-img-top"
        alt={name}
        style={{ height: "30rem" }}
      />
      <div className="card-body">
        <h1 className="card-title">{name}</h1>
        <p className="card-text">Population: {population}</p>
        <p className="card-text">Terrain: {terrain}</p>
        <p className="card-text">Climate: {climate}</p>
        <p className="card-text">Gravity: {gravity}</p>
      </div>
    </div>
  );
}

export default PlanetDetail;