<template>
  <section class="welcome">
    <div class="welcome__image">
      <div class="welcome__image-contenedor">
        <img src="../assets/images/pika-mask.png" alt="pikachu-saludo">
      </div>
    </div>
    <div class="welcome__message">
      <div class="welcome__message-message">
        <h1> Welcome to Pokédex </h1>
        <p>
          The digital encyclopedia created by Professor Oak is an
          invaluable tool to Trainers in the Pokémon world.
        </p>
      </div>
      <div class="welcome__message-action">
        <button id="get-started" type="button" @click="goPokemons"> Get started </button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Welcome',
  components: {
  },
  methods: {
    goPokemons() {
      this.$router.push('pokemons');
    }
  }
}
</script>

<style lang="scss" scoped>

.welcome {
  position: relative;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-flow: column wrap;
  width: 100%;
  height: 100%;

  .welcome__image {
    display: flex;
    justify-content: center;
    margin-bottom: 15px;

    .welcome__image-contenedor {
      border: 1px solid var(--black);
      border-radius: 50%;
      width: 285px;
      height: 278px;
      background-color: var(--primary);
      @media screen and (max-width: 300px) {
        width: 260px;
        height: 249px;
      }
      img {
        // object-fit: cover;
        // object-position: center;
        @media screen and (max-width: 410px) {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .welcome__message {
    @media screen and (max-width: 300px) {
      padding: 10px;
    }
    .welcome__message-message {
      h1 {
        font-size: 2em;
        font-weight: bold;
      }

      p {
        font-size: 1.1em;
        max-width: 570px;
        line-height: 26px;
        padding: 0 10px;
      }
    }

    .welcome__message-action {
      button[type="button"] {
        width: 135px;
        font-size: 1em;
        color: var(--white);
        background-color: var(--primary);
        border: none;
        padding: 11px 20px;
        border-radius: 60px;
      }

      button[type="button"]:hover {
        cursor: pointer;
        background-color: var(--primary-oscuro);
      }
    }
  }
}

</style>
