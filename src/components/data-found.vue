<template>
  <div class="data-found">
    <!-- Lista de pokemons -->
    <pokemon-list :pokemonsList="pokemons" />
    <!-- Controles del tab -->
    <div class="data-found__controles">
      <button class="button active" id="get-all" type="button" @click="cambioTab">
        <span class="material-icons-outlined">format_list_bulleted</span>
        All
      </button>

      <button class="button" id="get-favorites" type="button" @click="cambioTab">
        <span class="material-icons-outlined">star</span>
        Favorites
      </button>
    </div>
  </div>
</template>

<script>
import pokemonList from './pokemon-list.vue';

export default {
  name: 'dataFound',

components: {
    'pokemon-list': pokemonList
  },

  props: {
  },

  data: () => ({
    tabAnterior: 'get-all',
    pokemons: [],
    favoritesPokemons: [],
    pokemonsList: []
  }),

  mounted(){
    // https://pokeapi.co/api/v2/pokemon
    // https://pokeapi.co/api/v2/pokemon/name
    this.$eventBus.$on('changed-pokemos', (newPokemons) => {
      this.pokemonsList = newPokemons;
      this.pokemons = this.pokemonsList;
    });

    this.$eventBus.$on('addRemoveFavorite', (resultado) => {
      this.actualizarListaFavoritos(resultado.newPokemon, resultado.add);
    });
  },

  methods: {
    cambioTab( event ) {
      const idActual = event.srcElement.id || event.srcElement.parentNode.id;
      document.getElementById(this.tabAnterior).classList.remove('active');
      document.getElementById(idActual).classList.add('active');
      this.tabAnterior = idActual;
      this.llenarListaPokemons( idActual );
    },

    llenarListaPokemons( tipo ){
      this.pokemons = tipo === 'get-all' ? this.pokemonsList : this.favoritesPokemons;
    },

    actualizarListaFavoritos( pokemon, add ) {
      if (add){
        this.favoritesPokemons.push( pokemon );
      } else {
        this.favoritesPokemons = this.favoritesPokemons.filter( (pok) => pok.name !== pokemon.name);
      }
      this.actualizarListaPokemon( pokemon.name, add );
    },

    actualizarListaPokemon( name, add ) {
      const pokemonIndex = this.pokemonsList.findIndex( (pokemon) => pokemon.name === name);

      if (pokemonIndex > -1) {
        this.pokemonsList[ pokemonIndex ].favorite = add;
        this.pokemons[ pokemonIndex ].favorite = add;
      }

    }

  },
  beforeDestroy() {
    this.$eventBus.$off('changed-pokemos');
    this.$eventBus.$off('addRemoveFavorite');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.data-found {
  .data-found__controles {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
    height: 73px;
    padding: 14px 0;
    background: var(--white);
    box-shadow: 0 -4px 8px 0 rgba(21,21,21,.2);
    position: absolute;
    right: 0;
    bottom: 0;

    button {
      margin:  0px 10px;
    }
  }
}

.button {
  font-size: 1em;
  min-width: 275px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  background-color: var(--secondary);
  border: none;
  padding: 11px 20px;
  border-radius: 60px;
  transition: background-color .3s ease-out .1s;
  span {
    margin-right: 8px;
  }
}

.button:hover {
  cursor: pointer;
  // background-color: var(--primary-oscuro);
}

.active {
  background-color: var(--primary);
}

</style>
