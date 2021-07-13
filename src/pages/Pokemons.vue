<template>
  <div class="pokemons">
    <!-- Hola somos los pokemones -->
    <div class="proando">
      <pokeball-loading />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/welcome.vue'
import pokeballLoading from '@/components/pokeball-loading.vue';

export default {
  name: 'pokemons',
  components: {
    'pokeball-loading': pokeballLoading
  }
}
</script>

<style lang="scss" scoped>

.pokemons {
  position: relative;
  display: flex;
}

.proando {
  width: 150px;
  height: 150px;
}

</style>
