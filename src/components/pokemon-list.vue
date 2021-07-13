<template>
  <div class="pokemons-list">
    <ul class="pokemons-list__ul">
      <li v-for="(pokemon, index) of pokemonsList" :key="index" class="pokemons-list-ul-li">
        {{ pokemon.name }}
        <span class="circle">
          <span class="input-icon material-icons-outlined">start</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'pokemon-list',
  props: {
    pokemonsList: {
      type: [],
      default: []
    }
  },
  methods: {
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pokemons-list {
  width: 100%;
  position: relative;
  margin-bottom: 10px;
  padding: 0 5px;
  overflow-y: auto;
  overflow-x: hidden;

  .pokemons-list__ul {
    width: 100%;
    max-height: 64vh;
    position: relative;
    padding: 5px 0 5px 5px;
    margin: 0;

    .pokemons-list-ul-li {
      list-style: none;
      position: relative;
      text-align: start;
      padding: 10px;
      margin: 10px 0;
      background-color: var(--white);
      font-size: 1.5em;
      display: flex;
      justify-content: space-between;
      border-radius: 5px;

      .circle {
        height: 35px;
        width: 35px;
        background-color: var(--cicle-background);
        display: inline-block;
        border: none;
        border-radius: 50%;
        padding: 5px;
        span {
          color:var(--secondary);
        }
      }

      .circle:hover {
        cursor: pointer;
        span {
          cursor: pointer;
        }
      }
    }
  }
}

.pokemons-list::-webkit-scrollbar {
	width: 12px;
	background-color: var(--background-scrollbar);
  border-radius: 10px;
  margin: 20px;
}

.pokemons-list::-webkit-scrollbar-thumb {
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 4px var(--input-color);
	background-color: var(--cicle-background);
}

.favorite {
  color: var(--gold);
}

</style>
