import React, { useState, useEffect, Fragment } from "react";
import PokemonCard from "./PokemonCard";
import axios from "axios";
import "../App.css";

const FetchPokemonData = () => {
  /*
    The effect hook called useEffect is used to fetch the data with axios from the API
    and to set the data in the local state of the component with the state hook's update function. 
    The promise resolving happens with async/await.
    
    However, when you run your application, you should stumble into a nasty loop. 
    The effect hook runs when the component mounts but also when the component updates. 
    Because we are setting the state after every data fetch, the component updates and the effect runs again. 
    It fetches the data again and again. That's a bug and needs to be avoided. 
    We only want to fetch data when the component mounts. 
    That's why you can provide an empty array as second argument to the effect hook to avoid activating it 
    on component updates but only for the mounting of the component.
     */

  const [data, updateData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsError(false);
      setIsLoading(true);
      try {
        const allPokemons = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );

        const pokemonData = await Promise.all(
          allPokemons.data.results.map((pokemon) => axios.get(pokemon.url))
        );

        updateData(pokemonData);
      } catch (e) {
        setIsError({ message: e.response.data, isError: true });
      }
      setIsLoading(false);
    };
    getData();
  }, []);
  return [{ data, isLoading, error }];
};

const PokemonGallery = () => {
  const [{ data, isLoading, error }] = FetchPokemonData();

  return (
    <Fragment>
      {error.isError && <div>{error.message}</div>}
      {isLoading ? (
        <div className="loadingContainer">
          <div id="floatingBarsG">
            <div class="blockG" id="rotateG_01"></div>
            <div class="blockG" id="rotateG_02"></div>
            <div class="blockG" id="rotateG_03"></div>
            <div class="blockG" id="rotateG_04"></div>
            <div class="blockG" id="rotateG_05"></div>
            <div class="blockG" id="rotateG_06"></div>
            <div class="blockG" id="rotateG_07"></div>
            <div class="blockG" id="rotateG_08"></div>
          </div>
        </div>
      ) : (
        data && (
          <div className="masonry">
            <PokemonCard pokemons={data} />
          </div>
        )
      )}
    </Fragment>
  );
};

export default PokemonGallery;
