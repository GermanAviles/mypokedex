import axios from "axios";
import { CONST } from '../assets/const.js';

export default {
  getPokemons() {
    return axios.get(`${ CONST.API }${ CONST.endpoints.pokemon }`);
  },

  detailPokemon( nameOrId ) {
    return axios.get(`${CONST.API}${CONST.endpoints.pokemon}/${nameOrId}`);
  }
};