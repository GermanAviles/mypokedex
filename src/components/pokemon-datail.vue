<template>
  <div class="pokemon-detail">
    <!-- Cargando datos pokemon -->
    <div v-if="cargando" class="pokemon-detail__loading">
      <pokeball-loading class="header-img-pokemon"/>
    </div>
    <!-- Header img pokemon -->
    <div class="pokemon-detail__header">
      <img class="header-background" src="../assets/images/background-perfil.png" alt="background-perfil">
      <pokeball-loading v-if="!cargando" class="header-img-pokemon"/>
    </div>
    <!-- Imformación pokemon -->
    <div v-if="!cargando" class="pokemon-detail__informacion">
      <div class="informacion-data">
        <span class="label">Name:</span> <span class="value">{{ pokemon.name  }}</span>
      </div>
      <div class="informacion-data">
        <span class="label">Weight:</span> <span class="value">{{ pokemon.weight  }}</span>
      </div>
      <div class="informacion-data">
        <span class="label">Height:</span> <span class="value">{{ pokemon.height  }}</span>
      </div>
      <div class="informacion-data">
        <span class="label">Types:</span>
        <span v-for="(type, index) of  pokemon.types" :key="index">
          {{ type }}<span class="value" v-if="index < (pokemon.types - 1)">,</span>
        </span>
      </div>
    </div>
    <!-- Controles -->
    <div v-if="!cargando" class="pokemon-detail__controles">
      <button id="share" type="button" @click="sharePokemon"> Shared to my friends </button>
      <span class="circle" @click="addRemoveFavorite( $event, pokemon )">
        <span
          :class="favoriteIs ? 'favorite' : ''"
          class="input-icon material-icons-outlined"
        >
        start
        </span>
      </span>
    </div>
  </div>
</template>

<script>
import pokeballLoading from './pokeball-loading.vue';
import pokemonService from '../services/pokemons.js';

export default {
  name: 'pokemon-detail',
  components: {
    'pokeball-loading': pokeballLoading
  },

  props: {
    nombrePokemon: String,
    isFavorite: {
      type: Boolean,
      default: false
    }
  },

  watch: {
  },

  mounted() {
    this.cargarInfoPokemon();
  },

  data: () => ({
    favorite: false,
    cargando: true,
    pokemon: {}
  }),

  computed: {
    favoriteIs() {
      return this.isFavorite;
    }
  },

  methods: {
    /**
     * @method cargarInfoPokemon()
     * @description Metodo encargado de consumir endpoint del detalle de un pokemon
    */
    async cargarInfoPokemon() {
      try {
        const response = await pokemonService.detailPokemon( this.nombrePokemon );
        this.pokemon = {
          name: response.data.name,
          weight: response.data.weight,
          height: response.data.height,
          types: response.data.types.map( (item) => item.type.name)
        };
        this.cargando = false;
      } catch (error) {
        console.error(error);
        this.cargando = false;
      }
    },
    /**
     * @method sharePokemon()
     * @description Metodo encargado de compartir información de un pokemon
    */
    sharePokemon(event) {
      this.copyInfo(event);
      this.descargarFile();
    },

    /**
     * @method copyInfo()
     * @param event Evento click recibido al activarse del boton
     * @description Metodo encargado de copiar la información en el portapapeles
    */
    copyInfo(event) {
      const clipboardData =
      event.clipboardData ||
      window.clipboardData ||
      event.originalEvent?.clipboardData ||
      navigator.clipboard;
      const filePokemon = `Nombre: ${ this.pokemon.name }, Peso: ${ this.pokemon.weight }, alto: ${ this.pokemon.height }, Tipos: ${this.pokemon.types.join('-')}\n`

      clipboardData.writeText(filePokemon);
      this.$emit('copied', true);
    },

    /**
     * @method descargarFile()
     * @description Metodo encargado de descargar la información del pokemon en un textFile
    */
    descargarFile() {
      let filePokemon = 'Nombre -- Peso -- Alto -- Tipos\n'
      filePokemon += `${ this.pokemon.name } -- ${ this.pokemon.weight } -- ${ this.pokemon.height } -- ${this.pokemon.types.join(',')}\n`
      const fileContents = filePokemon;
      const fileName = `info_${this.pokemon.name}_pokemon.txt`;

      const pp = document.createElement('a');
      pp.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(fileContents));
      pp.setAttribute('download', fileName);
      pp.click();
    },

    /**
      * @method addRemoveFavorite()
      * @param event Evento click recibido al activarse del boton favorito
      * @description Metodo encargado de emitir si se agrega o elimina un pokemon a la lsita
      * de favoritos
    */
    addRemoveFavorite( event ) {
      event.stopPropagation();
      event.srcElement.parentElement.blur();
      this.favorite = !this.isFavorite;
      this.$eventBus.$emit('addRemoveFavorite', { name: this.nombrePokemon, add: this.favorite });
    }
  }
}
</script>

<style scoped lang="scss">
.pokemon-detail {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column nowrap;

  .pokemon-detail__loading {
    z-index: 40;
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-modal);
  }

  .pokemon-detail__header {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 40%;
    flex-shrink: 3;
    flex-grow: 1;

    .header-background {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      z-index: 1;
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
    }

    .header-img-pokemon{
      position: absolute;
      z-index: 10;
    }
  }

  .pokemon-detail__informacion {
    padding: 15px 25px;
    flex-basis: 40%;
    flex-shrink: 2;
    flex-grow: 2;

    .informacion-data {
      text-align: start;
      padding: 10px 0;
      border-bottom: .5px solid rgba(0, 0, 0, 0.247);
      margin-bottom: 10px;

      .label{
        font-weight: 600;
      }
    }

  }

  .pokemon-detail__controles {
    width: 100%;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-content: center;
    padding: 10px 25px;
    flex-shrink: 0;
    flex-grow: 1;
    flex-basis: 10%;

    @media screen and (max-width: 310px) {
      flex-flow: column wrap;
      align-items: center;
      justify-content: center;
    }

    button[type="button"] {
      // width: 135px;
      font-size: 1em;
      color: var(--white);
      background-color: var(--primary);
      border: none;
      padding: 11px 20px;
      border-radius: 60px;
      @media screen and (max-width: 310px) {
        margin-bottom: 10px;
      }
    }

    button[type="button"]:hover {
      cursor: pointer;
      background-color: var(--primary-oscuro);
    }

    .circle {
      height: 35px;
      width: 35px;
      background-color: var(--cicle-background);
      display: inline-block;
      border: none;
      border-radius: 50%;
      padding: 5px;
      span {
        width: 24px;
        color:var(--secondary);
      }
      .favorite {
        color: var(--gold);
      }
    }
  }
}

.value {
  font-size: 1.1em;
}

.circle:hover {
  cursor: pointer;
  span {
    cursor: pointer;
  }
}

</style>
