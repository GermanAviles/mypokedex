<template>
  <div class="data-found">
    <!-- TABS -->
    <tab-pokemons @openModalPokemon="verPokemon" />

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
import toast from './toast.vue';

export default {
  name: 'dataFound',

components: {
    'tab-pokemons': tabPokemons,
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
  },

  methods: {
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
    height: calc( 85vh - 90px );
    background-color: var(--white);
    border: none;
    border-radius: 9px;
    position: relative;

    @media screen and (max-width: 880px){
      width: 90vw;
      height: calc( 83vh - 90px );
      padding: 0 0 20px 0;
    }

    @media screen and (max-width: 341px) {
      width: 90vw;
      height: calc( 83vh - 90px );
      padding: 0 0 20px 0;
    }

    @media screen and (max-width: 302px) {
      width: 90vw;
      height: calc( 92vh - 90px );
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
