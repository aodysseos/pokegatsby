import * as React from "react";
import { graphql, navigate } from "gatsby";

import PokemonList from "../components/PokemonList";

const PokemonListTemplate = ({ data, pageContext, ...rest }) => {
  const { limit, offset, numPages, currentPage, pokemon } = pageContext;
  const { allPokemon } = data;

  return (
    <main>
      <PokemonList
        items={allPokemon.nodes}
        numPages={numPages}
        currentPage={currentPage}
      />
    </main>
  );
};

export const pokemonListQuery = graphql`
  query pokemonListQuery($offset: Int!, $limit: Int!) {
    allPokemon(limit: $limit, skip: $offset) {
      nodes {
        id
        number
        name
        pokemonImg {
          childImageSharp {
            gatsbyImageData(width: 200)
          }
        }
      }
    }
  }
`;

export default PokemonListTemplate;
