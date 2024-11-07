import { gql } from 'apollo-server';

const typeDefs = gql`
  type Stat {
    name: String
    base_stat: Int
  }

  type Sprites  {
    back_default: String
    back_shiny: String
    front_default: String
    front_shiny: String
  }

  type Ability {
    name: String
    url: String
  }

  type Pokemon {
    name: String
    url: String
    sprites: Sprites
    types: [String]  
    stats: [Stat]
    abilities: [Ability]
  }

  type Query {
    pokemons: [Pokemon]   
    pokemon(name: String!): Pokemon  
    types: [String]  
    pokemonsByType(type: String!): [Pokemon]  
  }
`;

export default typeDefs;
