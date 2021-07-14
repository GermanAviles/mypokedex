<template>
  <div class="data-found">
    <!-- Lista de pokemons -->
    <pokemon-list :pokemonsList="pokemons" @viewPokemon="verPokemon" />
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
    <!-- Modal perfil pokemon -->
    <div id="modal-detail" class="modal">
      <div class="modal__body-modal">
        <span class="material-icons-outlined close-modal" @click="closeModal">close</span>
        <pokemon-detail
          v-if="pokemonSeleccionado"
          :nombrePokemon="pokemonSeleccionado.name"
          :isFavorite="pokemonSeleccionado.favorite"
          @copied="showToast"
        />
      </div>
    </div>
    <!-- TOAST PARA ALERTAR -->
    <toast :icon="'done'" :message="'Copied Pokemon'"/>
  </div>
</template>

<script>
import pokemonList from './pokemon-list.vue';
import pokemonDetail from './pokemon-datail.vue';
import toast from './toast.vue';

export default {
  name: 'dataFound',

components: {
    'pokemon-list': pokemonList,
    'pokemon-detail': pokemonDetail,
    toast
  },

  props: {
  },

  data: () => ({
    tabAnterior: 'get-all',
    pokemons: [],
    favoritesPokemons: [],
    pokemonsList: [],
    pokemonSeleccionado: null,
  }),

  mounted(){
    this.$eventBus.$on('changed-pokemos', (newPokemons) => {
      this.pokemonsList = newPokemons;
      this.pokemons = this.pokemonsList;
      console.log('new', newPokemons);
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
    },

    actualizarListaPokemon( name, add ) {
      const pokemonIndex = this.pokemonsList.findIndex( (pokemon) => pokemon.name === name);
      let pokemon = null;

      if (pokemonIndex > -1) {
        pokemon = this.pokemonsList[ pokemonIndex ];
        this.pokemonsList[ pokemonIndex ].favorite = add;
        this.pokemons[ pokemonIndex ].favorite = add;
        this.actualizarListaFavoritos( pokemon, add);
      }
    },

    verPokemon( pokemon ) {
      this.pokemonSeleccionado = pokemon;
      document.getElementById('modal-detail').classList.toggle('show-modal');
    },

    closeModal() {
      this.pokemonSeleccionado = null;
      document.getElementById('modal-detail').classList.toggle('show-modal');
    },

    showToast() {
      const x = document.getElementById("toast")
      x.className = "show";
      setTimeout(() => {
        x.className = x.className.replace("show", "");
      }, 5000);
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
  z-index: 10;

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
  transition: background-color .3s ease-out;
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

.modal {
  z-index: 90;
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: var(--background-modal);
  display: none;
  justify-content: center;
  align-items: center;
  transition: display .2s ease-in .1s;

  .modal__body-modal{
    width: 50vw;
    height: 78vh;
    background-color: var(--white);
    border: none;
    border-radius: 9px;
    position: relative;

    .close-modal{
      z-index: 50;
      position: absolute;
      right: 10px;
      top: 8px;
      background-color: var(--white);
      border: none;
      border-radius: 50%;
      padding: 2px;
      color: var(--color-sky);
      font-weight: bold;
    }
    .close-modal:hover{
      cursor: pointer;
    }
  }
}

.show-modal {
  display: flex;
}


</style>
