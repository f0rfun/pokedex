import React, { Fragment } from "react";
import "../App.css";

const PokemonCard = ({ data }) => (
  <Fragment>
    {data.results.map((x, i) => (
      <div key={i}>{x.name}</div>
    ))}
  </Fragment>
);

export default PokemonCard;
