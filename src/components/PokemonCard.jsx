import React, { Fragment } from "react";
import "../App.css";

const getPokemonType = (types) => {
  return types.map((type) => {
    let classType = "";
    switch (type["type"]["name"]) {
      case "water":
        classType = "water";
        break;
      case "fire":
        classType = "fire";
        break;
      case "grass":
        classType = "grass";
        break;
      case "fairy":
        classType = "fairy";
        break;
      case "poison":
        classType = "poison";
        break;
      case "flying":
      case "dragon":
        classType = "flying";
        break;
      case "psychic":
        classType = "psychic";
        break;
      case "steel":
        classType = "steel";
        break;
      case "electric":
        classType = "electric";
        break;
      case "bug":
      case "ground":
        classType = "bug";
        break;
      case "ice":
      case "ghost":
        classType = "ice";
        break;
      case "fighting":
        classType = "fighting";
        break;
      case "rock":
        classType = "rock";
        break;
      default:
        classType = "normal";
    }
    return (
      <span className={classType}>
        <b>{type["type"]["name"]}</b>
      </span>
    );
  });
};

const getPokemonStats = (stats) => {
  return stats.reverse().map((stat) => {
    return (
      <p className="statsText">
        <b>
          {stat["stat"]["name"]}: {stat.base_stat}
        </b>
      </p>
    );
  });
};

const PokemonCard = ({ pokemons }) => (
  <Fragment>
    {pokemons.map((pokemon, index) => (
      <div key={index} className="grid">
        <div className="statsOverlay"></div>
        <img
          src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.data.id}.png`}
          alt={`${pokemon.data.id}_image`}
        />
        <div className="gridBody">
          <div className="relative">
            <h1 className="pokemonName">{pokemon.data.name}</h1>
            <div>{getPokemonType(pokemon.data.types)}</div>
          </div>
        </div>
        <div className="statsDetails fadeIn-bottom">
          <div className="statsContainer">
            {getPokemonStats(pokemon.data.stats)}
          </div>
        </div>
      </div>
    ))}
  </Fragment>
);

export default PokemonCard;
