module.exports = {
  siteMetadata: {
    title: "Pokegatsby",
  },
  plugins: [
    "gatsby-plugin-styled-components",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    // {
    //   resolve: "gatsby-source-graphql",
    //   options: {
    //     typeName: "POKEAPI",
    //     fieldName: "pokeapi",
    //     url: "https://beta.pokeapi.co/graphql/v1beta",
    //   },
    // },
    {
      resolve: `gatsby-plugin-material-ui`,
      options: {
        stylesProvider: {
          injectFirst: true,
        },
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
  ],
  flags: {
    FAST_DEV: true,
  },
};
