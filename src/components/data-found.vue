<template>
  <div class="data-found">

    <!-- Sin resultados de la busqueda -->
    <div v-if="!conResultados" class="pokemons__no-data-found">
      <no-data-found @goback="goBack" />
    </div>

    <!-- TABS -->
    <tab-pokemons
      v-show="conResultados"
      :pokemonsList="pokemonsList"
      @openModalPokemon="verPokemon"
      @tabChanged="tabActual = $event"
      @updateFavoriteList="favoritesPokemons = $event"
    />

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
import tabPokemons from './tab-pokemons.vue';
import pokemonDetail from './pokemon-datail.vue';
import noDataFound from './no-data-found.vue';

import toast from './toast.vue';

export default {
  name: 'dataFound',

components: {
    'tab-pokemons': tabPokemons,
    'pokemon-detail': pokemonDetail,
    'no-data-found': noDataFound,
    toast
  },

  props: {
  },

  data: () => ({
    tabAnterior: 'get-all',
    pokemons: [],
    pokemonsList: [],
    favoritesPokemons: [],
    pokemonSeleccionado: null,
    tabActual: '',
    conResultados: true
  }),

  mounted(){
    this.$eventBus.$on('changed-pokemos', (newPokemons) => {
      this.pokemons = newPokemons;
      this.pokemonsList = newPokemons;

      this.conResultados = this.pokemonsList.length ? true : false;
    });

    this.$eventBus.$on('buscarPokemon', ( texto ) => this.searchingList(texto) )
  },

  methods: {
    /**
     * @method verPokemon()
     * @description Metodo encargado de recibir el pokemon seleccionado y abrir el modal
    */
    verPokemon( pokemon ) {
      this.pokemonSeleccionado = pokemon;
      document.getElementById('modal-detail').classList.toggle('show-modal');
    },

    /**
     * @method closeModal()
     * @description Metodo encargado de Cerrar el modal
    */
    closeModal() {
      this.pokemonSeleccionado = null;
      document.getElementById('modal-detail').classList.toggle('show-modal');
    },

    /**
     * @method showToast()
     * @description Metodo encargado de mostrar el toast de informacion copiada y descargada
    */
    showToast() {
      const x = document.getElementById("toast")
      x.className = "show";
      setTimeout(() => {
        x.className = x.className.replace("show", "");
      }, 5000);
    },

    /**
     * @method searchingList()
     * @description Metodo encargado de filtrar los pokemons dependiendo de el tab del usuario
    */
    searchingList( text ) {
      const pokemons = this.tabActual === 'get-all' ? this.pokemons : this.favoritesPokemons;

      if (this.tabActual === 'get-all') {
        this.pokemonsList = pokemons;

        if (text && text.length) {
          this.pokemonsList = this.filtrarPokemons( pokemons, text );
          this.conResultados = this.pokemonsList.length ? true : false;
        } else {
          this.conResultados = true;
        }

      } else {
        let filteredFavorites = pokemons;

        if (text && text.length) {
          filteredFavorites = this.filtrarPokemons( pokemons, text );
          this.conResultados = filteredFavorites.length ? true : false;
        } else {
          filteredFavorites = this.filtrarListPokToFav();
          this.conResultados = true;
        }

        this.$eventBus.$emit('changedListFavorite', filteredFavorites);
      }
    },

    /**
     * @method filtrarPokemons()
     * @description Metodo encargado de filtrar los pokemons por coincidencia
    */
    filtrarPokemons( listPokemons, text ) {
      return listPokemons.filter( (pokemon) => pokemon.name.match( text ) );
    },

    /**
     * @method filtrarListPokToFav()
     * @description Metodo encargado de filtrar los pokemons para obtener los favoritos
    */
    filtrarListPokToFav() {
      return this.pokemonsList.filter( (pokemon) => pokemon.favorite === true );
    },

    goBack() {
      this.$router.back();
    }

  },

  beforeDestroy() {
    this.$eventBus.$off('changed-pokemos');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.data-found {
  z-index: 10;
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
    height: 90%;
    background-color: var(--white);
    border: none;
    border-radius: 9px;
    position: relative;

    @media screen and (max-width: 880px){
      width: 90vw;
      padding: 0 0 20px 0;
    }

    @media screen and (max-width: 341px) {
      width: 90vw;
      padding: 0 0 20px 0;
    }

    @media screen and (max-width: 302px) {
      width: 90vw;
      padding: 0 0 20px 0;
    }


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
