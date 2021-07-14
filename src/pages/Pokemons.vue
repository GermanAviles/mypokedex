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
      <!-- Sin resultados -->
      <div v-show="!searching && this.textoBusqued" class="pokemons__no-data-found">
        <no-data-found @goback="limpiarBusqueda" />
      </div>
      <!-- Con resultados -->
      <div class="pokemons__data">
        <data-found />
      </div>
    </div>

  </div>
</template>

<script>
import pokeballLoading from '@/components/pokeball-loading.vue';
import noDataFound from '@/components/no-data-found.vue';
import buscador from '@/components/buscador.vue';
import dataFound from '@/components/data-found.vue';
import pokemonService from '../services/pokemons';

export default {
  name: 'pokemons',
  components: {
    'pokeball-loading': pokeballLoading,
    'no-data-found': noDataFound,
    'data-found': dataFound,
    buscador,
  },

  data: () => ({
    timeHandler: null,
    cargando: true,
    textoBusqued: null,
    listadoPokemons: [],
    searching: true,
  }),

  watch: {
    textoBusqued() {
      this.searching = true;
      clearTimeout( this.timeHandler );
      this.timeHandler = setTimeout(() => {
        if (this.textoBusqued && this.textoBusqued.length) {
          // const patt = new RegExp(/^[A-Za-z0-9\s]+$/g);
          // const testString = patt.test( this.textoBusqued );
          // if (!testString) {
          //   // this.search = string;
          //   let out = ''
          //   const filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890'// Caracteres validos
          //   for (let i=0; i< this.textoBusqued.length; i++){
          //     if (filtro.includes(this.textoBusqued.charAt(i))){
          //       out += this.textoBusqued.charAt(i)
          //     }
          //   }
          //   console.log(out);
          // }
          const nuevoListado = this.listadoPokemons.filter( (pokemon) => pokemon.name === this.textoBusqued);
          this.searching = nuevoListado.length ? true : false;
          this.$eventBus.$emit('changed-pokemos', nuevoListado);
        } else {
          this.$eventBus.$emit('changed-pokemos', this.listadoPokemons);
          this.searching = true;
        }
      }, 300);
      // console.log('NYEIV: ', this.textoBusqued);
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
      }
    },

    limpiarBusqueda() {
      // this.textoBusqued = null;
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
    // position: relative;

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
    // display: block;
    transform: translateX(0%);
  }
  100% {
    // display: none;
    // position: absolute;
    // top: -100px;
    transform: translateX(-100%);
  }
}

.hidden {
  display: none;
}

</style>
