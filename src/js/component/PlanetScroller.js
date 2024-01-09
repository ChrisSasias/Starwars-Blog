import React from "react";
import PlanetCard from "./PlanetCard";

import "../../styles/home.css";

const PlanetScroller = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <PlanetCard />
        </div>
      </div>
    </div>
  );
};

export default PlanetScroller;