<template>
  <div class="tab">
    <!-- Lista de pokemons -->
    <div class="tab__content">
      <div id="tab__content-1" class="content show-tab">
        <pokemon-list :pokemonsList="pokemonsList" @viewPokemon="verPokemon" />
      </div>
      <div id="tab__content-2" class="content">
        <pokemon-list :pokemonsList="favoritesPokemons" @viewPokemon="verPokemon" />
      </div>
    </div>

    <!-- Controles del tab -->
    <div class="tab__controls">
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
  name: 'data-pokemons',

components: {
    'pokemon-list': pokemonList,
  },

  props: {
  },

  data: () => ({
    tabAnterior: 'get-all',
    favoritesPokemons: [],
    pokemonsList: [],
    tabs: {
      'get-all': 'tab__content-1',
      'get-favorites': 'tab__content-2'
    }
  }),

  mounted(){
    this.$eventBus.$on('changed-pokemos', (newPokemons) => {
      this.pokemonsList = newPokemons;
    });

    this.$eventBus.$on('addRemoveFavorite', (resultado) => {
      this.actualizarListaPokemon(resultado.name, resultado.add);
    });

  },

  methods: {
    cambioTab( event ) {
      const idActual = event.srcElement.id || event.srcElement.parentNode.id;

      document.getElementById(this.tabAnterior).classList.remove('active');
      document.getElementById(idActual).classList.add('active');

      this.tabAnterior = idActual;
      this.showTabSelected( idActual );
    },

    showTabSelected( idControl ) {
      for( let keyTab in this.tabs ){
        document.getElementById( this.tabs[keyTab] ).classList.remove('show-tab');
        if (keyTab === idControl) {
          document.getElementById( this.tabs[keyTab] ).classList.add('show-tab');
        }
      }
    },

    actualizarListaPokemon( name, add ) {
      const pokemonIndex = this.pokemonsList.findIndex( (pokemon) => pokemon.name === name);

      if (pokemonIndex > -1) {
        this.pokemonsList[ pokemonIndex ].favorite = add;
        this.actualizarListaFavoritos( this.pokemonsList[ pokemonIndex ], add);
      }
    },

    actualizarListaFavoritos( pokemon, add ) {

      if (add){
        this.favoritesPokemons.push( pokemon );
      } else {
        // this.favoritesPokemons = this.favoritesPokemons.filter( (pokmon) => pokmon.name !== pokemon.name);
        const indexFav = this.favoritesPokemons.findIndex( (pokmon) => pokmon.name === pokemon.name);
        this.favoritesPokemons.splice(indexFav, 1);
      }
    },

    verPokemon( pokemon ) {
      this.$emit('openModalPokemon', pokemon)
    },

  },
  beforeDestroy() {
    this.$eventBus.$off('changed-pokemos');
    this.$eventBus.$off('addRemoveFavorite');
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.tab {
  z-index: 10;
  .tab__content{

    .content {
      display: none;
    }

    #tab__content-1.show-tab {
      display: block;
    }

    #tab__content-2.show-tab {
      display: block;
    }
  }
  .tab__controls {
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
  width: 275px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--white);
  background-color: var(--secondary);
  border: none;
  padding: 11px 20px;
  border-radius: 60px;
  transition: background-color .3s ease-out;
  @media screen and (max-width: 689px) {
    width: fit-content;
  }
  span {
    margin-right: 8px;
  }
}

.button:hover {
  cursor: pointer;
}

.active {
  background-color: var(--primary);
}

</style>
