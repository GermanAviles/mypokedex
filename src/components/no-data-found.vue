<template>
  <div class="no-data-found">
    <h3> Uh-oh! </h3>
    <p> You look lost on your journey! </p>
    <button id="back-home" type="button" @click="backHome"> Go back home </button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    backHome() {
      // this.$router.back();
      this.$emit('goback');
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.no-data-found {

  h3 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 14px;
  }

  p {
    font-size: 1.2em;
    margin-bottom: 30px;
  }

  button[type="button"] {
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


</style>
