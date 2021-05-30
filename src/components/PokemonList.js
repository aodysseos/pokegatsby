import * as React from "react";
import { graphql, navigate } from "gatsby";
import styled from "styled-components";

import { Pagination } from "@material-ui/lab";

import PokemonCard from "./PokemonCard";

const List = styled.div`
  display: flex;
  flex-direction: row;
`;

const PokemonList = ({ items, numPages, currentPage }) => {
  const handlePageChange = (event, pageIndex) => {
    event.preventDefault();
    navigate(`/pokedex/${pageIndex}`);
  };

  return (
    <>
      <List>
        {items.map((item) => (
          <PokemonCard key={item.id} {...item} />
        ))}
      </List>
      <Pagination
        count={numPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </>
  );
};

export default PokemonList;
