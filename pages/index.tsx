import { useState } from "react";
import type { NextPage, GetStaticProps } from "next";

interface SpriteCategory{
    front_default: string;
    back_default: string;
}

interface Pokemon{
    name: string;
    id: number;
    sprites: SpriteCategory;
}

const randomPokemonIndex = () : string => {
    return `${Math.floor(Math.random() * 905)}`;
};

const fetchPokemonImage = async () =>{
    const url = "https://pokeapi.co/api/v2/pokemon/" + randomPokemonIndex();
    const res = await fetch(url);
    return (await res.json()) as Pokemon;
}

interface IndexPageProps{
    front_image?: string;
    back_image?: string;
}

const IndexPage : NextPage<IndexPageProps> = (props: IndexPageProps) => {
    const [pokemonImageUrl,setPokemonImageUrl] = useState(props.front_image);
    const [pokemonImageUrl2,setPokemonImageUrl2] = useState(props.back_image);

    let pokemon;
    const handleClick = async () => {
        pokemon = await fetchPokemonImage();
        setPokemonImageUrl(pokemon.sprites.front_default);
        setPokemonImageUrl2(pokemon.sprites.back_default);
    };

    return(
        <div>
            <button onClick={handleClick}>Chenge</button>
            <img src={pokemonImageUrl}/>
            <img src={pokemonImageUrl2}/>
        </div>    
    );
};

export const getStaticProps: GetStaticProps = async () => {
  const pokemonImage = await fetchPokemonImage();
  return {
    props: {
      front_image: pokemonImage.sprites.front_default,
      back_image: pokemonImage.sprites.back_default,
    },
  };
};

export default IndexPage;
