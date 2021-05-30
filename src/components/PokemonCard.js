import * as React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import styled from "styled-components";

const Card = styled.div`
  max-width: 200px;
  > img {
    width: 100%;
  }
`;

const PokemonCard = ({ id, number, name, pokemonImg }) => {
  console.log({ id, number, name, pokemonImg });
  const image = getImage(pokemonImg);
  return (
    <Card>
      <h2>{`(${number}) ${name}`}</h2>
      <GatsbyImage image={image} alt={name} />
    </Card>
  );
};

export default PokemonCard;
