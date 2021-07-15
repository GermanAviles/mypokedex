<template>
  <div class="pokemons">
    <!-- loading -->
    <div v-if="cargando" id="pokemons__loading" class="pokemons__loading">
      <pokeball-loading />
    </div>

    <div v-show="!cargando" class="pokemons__contenedor">
      <!-- Buscador -->
      <div class="contenedor-buscador">
        <buscador v-model="textoBusqued"/>
      </div>

      <!-- Contenido -->
      <div v-show="mostrarData" class="pokemons__data">
        <data-found />
      </div>
    </div>

  </div>
</template>

<script>
import pokeballLoading from '@/components/pokeball-loading.vue';
import buscador from '@/components/buscador.vue';
import dataFound from '@/components/data-found.vue';
import pokemonService from '../services/pokemons';

export default {
  name: 'pokemons',
  components: {
    'pokeball-loading': pokeballLoading,
    'data-found': dataFound,
    buscador,
  },

  data: () => ({
    timeHandler: null,
    cargando: true,
    textoBusqued: null,
    listadoPokemons: [],
    mostrarData: true
  }),

  watch: {
    textoBusqued() {
      this.searching = true;
      clearTimeout( this.timeHandler );
      this.timeHandler = setTimeout(() => {
        this.$eventBus.$emit('buscarPokemon', this.textoBusqued);
      }, 300);
    }
  },

  mounted() {
    this.cargarPokemones();
  },

  methods: {
    async cargarPokemones() {
      this.cargando = true;
      try {
        const response = await pokemonService.getPokemons();
        this.listadoPokemons = response.data.results.map((pokemon) => ({ ...pokemon, favorite: false  }));
        this.cargando = false;
        this.$eventBus.$emit('changed-pokemos', this.listadoPokemons);
      } catch (error) {
        console.error(error);
        this.cargando = false;
        this.listadoPokemons = [];
        this.$eventBus.$emit('changed-pokemos', this.listadoPokemons);
      }
    },

    limpiarBusqueda() {
      this.$router.back();
    }
  },

  beforeDestroy() {
    this.$eventBus.$off('addRemoveFavorite');
  },
}
</script>

<style lang="scss" scoped>

.pokemons {
  padding: 20px 10px;
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-flow: column wrap;
  justify-content: center;
  align-content: center;

  .pokemons__loading {
    display: flex;
    align-items: center;
  }

  .pokemons__contenedor {
    width: 52vw;
    max-width: 690px;
    @media screen and (max-width: 800px){
      width: 93vw;
    }

    .contenedor-buscador {
      width: 100%;
      height: fit-content;
    }

    .pokemons__data {
      margin-top: 10px;
    }

  }
}

@keyframes easeout {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

.hidden {
  display: none;
}

</style>
