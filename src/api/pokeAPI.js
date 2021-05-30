const axios = require("axios");
/**
 * Sample Web Service
 * This is a sample service class that uses fetch and promises.
 *
 * I am using the http://httpbin.org endpoint to ensure this example is working properly.
 *
 * @class pokeAPI
 */
class pokeAPI {
  constructor() {
    this.protocol = "https";
    this.hostName = "pokeapi.co";
    this.versionPath = "/api/v2/";
    this.limit = 151;
    this.offset = 0;
  }

  /**
   * Sample Get Fetch using HTTP Bin
   *
   * @example
   var service = new pokeAPI();
   service.Get().then((success => {
        console.log(success);
      }))
   * @memberof pokeAPI
   * @returns {array} returns an Array
   */
  async get({ url, resource, params = {} }) {
    try {
      const resourceUrl =
        url ||
        `${this.protocol}://${this.hostName}${this.versionPath}${resource}`;
      const response = await axios.get(resourceUrl, { params });
      return response.data;
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async getPokemon(params = {}) {
    try {
      const data = await this.get({
        resource: "pokemon",
        params,
      });
      const { results = [], count, next, previous } = data;
      return results;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  pokemonMapper(pokemon) {
    return {
      id: pokemon.id,
      number: pokemon.id,
      name: pokemon.name,
      image: pokemon.sprites.other["official-artwork"].front_default,
    };
  }

  async getAllOrginialPokemon() {
    try {
      const results = await this.getPokemon({ offset: 0, limit: 20 });
      const allOriginalPokemonPromises = results.map((pokemon) => {
        return axios.get(pokemon.url).then((result) => {
          const { data = {} } = result;
          return this.pokemonMapper(data);
        });
      });
      return Promise.all(allOriginalPokemonPromises);
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  /**
   * Sample Post Fetch using HTTP Bin
   * @example
   var service = new pokeAPI();
   service.Post({
          custname: 'John Doe',
          custemail: 'test@test.com'
        }).then(success => {
          console.log(success);
        })
   * @param {Object} object This is the form data.
   * @memberof pokeAPI
   * @returns {Promise} return a promise
   */
  Post(object) {
    return new Promise((resolve, reject) => {
      // We create a new form
      var formData = new FormData();

      // we add all object items to the new form
      forEach(object, (value, key) => {
        formData.append(key, value);
      });

      // We fetch Post the API
      fetch("https://httpbin.org/post", {
        method: "post",
        body: formData,
      })
        .then((response) => {
          if (response.status !== 200) {
            // Not success
            resolve(response.text());
          } else {
            // Success
            resolve(response.text());
          }
        })
        .catch((err) => {
          // Service Error
          reject(err);
        });
    });
  }
}

exports.pokeAPI = pokeAPI;
