<template>
  <div class="pokemons">
    <!-- loading -->
    <div v-if="cargando" id="pokemons__loading" class="pokemons__loading">
      <pokeball-loading />
    </div>
    <div v-show="!cargando" class="pokemons__contenedor">
      <!-- Buscador -->
      <div class="contenedor-buscador">
        <buscador />
      </div>
      <!-- Sin resultados -->
      <div v-if="!listadoPokemons.lenght && textoBusqued" class="pokemons__no-data-found">
        <no-data-found @goback="limpiarBusqueda" />
      </div>
      <!-- Con resultados -->
    </div>

  </div>
</template>

<script>
import pokeballLoading from '@/components/pokeball-loading.vue';
import noDataFound from '@/components/no-data-found.vue';
import buscador from '@/components/buscador.vue';

export default {
  name: 'pokemons',
  components: {
    'pokeball-loading': pokeballLoading,
    'no-data-found': noDataFound,
    buscador,
  },

  data: () => ({
    cargando: true,
    textoBusqued: 'asdasd',
    listadoPokemons: []
  }),

  mounted() {
    setTimeout( () => {
      this.cargando = false;
      // document.getElementById('pokemons__loading').classList.add('animated');
    }, 1000);
  },

  methods: {
    limpiarBusqueda() {
      console.log('EVENTO RECIBIDO');
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

    .contenedor-buscador {
      height: fit-content;
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
