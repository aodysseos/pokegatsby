const path = require("path");
const pokeAPI = require("./src/api/pokeAPI");
const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  store,
  cache,
  reporter,
}) => {
  const api = new pokeAPI.pokeAPI();
  const pokemons = await api.getAllOrginialPokemon();

  pokemons.forEach(async (pokemon) => {
    const { id, image, ...rest } = pokemon;
    const nodeId = createNodeId(`Pokemon-${pokemon.name}`);
    const fileNode = await createRemoteFileNode({
      url: image, // string that points to the URL of the image
      parentNodeId: nodeId, // id of the parent node of the fileNode you are going to create
      createNode, // helper function in gatsby-node to generate the node
      createNodeId, // helper function in gatsby-node to generate the node id
      store,
      cache,
      reporter,
    });

    const node = {
      id: nodeId,
      image,
      pokemonImg___NODE: fileNode ? fileNode.id : null,
      ...rest,
      internal: {
        type: "Pokemon",
        contentDigest: createContentDigest(pokemon),
      },
    };

    createNode(node);
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allPokemon {
        nodes {
          id
          name
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Create pokemon-list pages
  const { nodes: items } = result.data.allPokemon;
  console.log({ items });
  const itemsPerPage = 5;
  const numPages = Math.ceil(items.length / itemsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    const offset = i * itemsPerPage;
    const limit = itemsPerPage;
    const currentPage = i;
    createPage({
      path: i === 0 ? `/pokedex` : `/pokedex/${i}`,
      component: path.resolve("./src/templates/pokemon-list-template.js"),
      context: {
        limit,
        offset,
        numPages,
        currentPage,
      },
    });
  });
};
