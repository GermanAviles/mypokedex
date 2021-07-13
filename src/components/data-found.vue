<template>
  <div class="data-found">
    <pokemon-list :pokemonsList="pokemonsList" />
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
    pokemonsList: [
      {"name":"bulbasaur", "url":"https://pokeapi.co/api/v2/pokemon/1/"},
      {"name":"ivysaur","url":"https://pokeapi.co/api/v2/pokemon/2/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
      {"name":"venusaur","url":"https://pokeapi.co/api/v2/pokemon/3/"},
    ]
  }),

  mounted(){
    // https://pokeapi.co/api/v2/pokemon
    // https://pokeapi.co/api/v2/pokemon/name
    this.$eventBus.$on('change-name', this.changeName);
  },

  methods: {
    cambioTab( event ) {
      const idActual = event.srcElement.id || event.srcElement.parentNode.id;
      document.getElementById(this.tabAnterior).classList.remove('active');
      document.getElementById(idActual).classList.add('active');
      this.tabAnterior = idActual;
    }
  },
  beforeDestroy() {
    this.$eventBus.$off('change-name');
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
