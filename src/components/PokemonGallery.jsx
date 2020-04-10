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
        const resp = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        updateData(resp.data);
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
      <div>
        {error.isError && <div>{error.message}</div>}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          data && <PokemonCard data={data} />
        )}
      </div>
    </Fragment>
  );
};

export default PokemonGallery;
