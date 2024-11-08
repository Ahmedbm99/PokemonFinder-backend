import fetch from 'node-fetch';

const resolvers = {
  Query: {
  
    pokemons: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100');
      const data = await response.json();

      const pokemons = await Promise.all(data.results.map(async (pokemon) => {
      
        const pokeDetailsResponse = await fetch(pokemon.url);
        const pokeDetails = await pokeDetailsResponse.json();

        return {
          id: pokeDetails.id,
          name: pokeDetails.name,
          url: pokemon.url,         
          types: pokeDetails.types.map(type => type.type.name),
          stats: pokeDetails.stats.map(stat => ({
            name: stat.stat.name,
            base_stat: stat.base_stat
          })),
          abilities: pokeDetails.abilities.map(ability => ({
            name: ability.ability.name,
            url: ability.ability.url
          })),
          sprites: {
            front_default: pokeDetails.sprites.front_default,
            back_default: pokeDetails.sprites.back_default,
            front_shiny: pokeDetails.sprites.front_shiny,
            back_shiny: pokeDetails.sprites.back_shiny
          }
        };
      }));

      return pokemons;
    },


    pokemon: async (_, { id }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();

      return {
        id: data.id,
        name: data.name,
        url: data.url,
        types: data.types.map(type => type.type.name),
        stats: data.stats.map(stat => ({
          name: stat.stat.name,
          base_stat: stat.base_stat
        })),
        abilities: data.abilities.map(ability => ({
          name: ability.ability.name,
          url: ability.ability.url
        })),
        sprites: {
          front_default: data.sprites.front_default,
          back_default: data.sprites.back_default,
          front_shiny: data.sprites.front_shiny,
          back_shiny: data.sprites.back_shiny
        }
      };
    },

    
    types: async () => {
      const response = await fetch('https://pokeapi.co/api/v2/type');
      const data = await response.json();
      return data.results.map(type => type.name);  
    },

   
    pokemonsByType: async (_, { type }) => {
      const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await response.json();
      return data.pokemon.map(p => p.pokemon); 
    },
  },
};

export default resolvers;
