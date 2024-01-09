import React from "react";
import PeopleCard from "./PeopleCard";

import "../../styles/home.css";

const PeopleScroller = () => {
  return (
    <div className="container">
      <div className="">
        <div className="">
          <PeopleCard />
        </div>
      </div>
    </div>
  );
};

export default PeopleScroller;