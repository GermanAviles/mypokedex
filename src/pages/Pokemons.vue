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
      <div v-if="!listadoPokemons.lenght && textoBusqued" class="pokemons__no-data-found">
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
    listadoPokemons: []
  }),

  watch: {
    textoBusqued() {
      clearTimeout( this.timeHandler );
      this.timeHandler = setTimeout(() => {
        // console.log('Ejecutar petición', this.textoBusqued);
      }, 300);
      // console.log('NYEIV: ', this.textoBusqued);
    }
  },

  mounted() {
    setTimeout( () => {
      this.cargando = false;
      // document.getElementById('pokemons__loading').classList.add('animated');
    }, 1000);
  },

  methods: {
    limpiarBusqueda() {
      // this.textoBusqued = null;
      this.$router.back();
    }
  }
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
