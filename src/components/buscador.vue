<template>
  <div class="buscador">
    <input
      type="text"
      id="buscador"
      name="buscador-pokemons"
      class="buscador__text"
      placeholder="Search"
      autocomplete="off"
      @input="$emit('input', $event.target.value)"
    >
    <span class="input-icon material-icons-outlined">search</span>
  </div>
</template>

<script>
export default {
  name: 'buscador',
  props: {
    value: {
      type: String,
      default: null
    }
  },
  data: () => ({
    content: null
  }),

  watch: {
    value() {
      this.content = this.value;
    },

    // $props: {
    //   deep: true,
    //   immediate: true,
    //   handler: () => {
    //     console.log('this.content, ');
    //   }
    // }
  },

  methods: {
    textoIngresado(event) {
      this.content = event.target.value;
      this.$emit('input', this.content);
    }
  }
}
</script>

<style scoped lang="scss">
.buscador{
  position: relative;

  .buscador__text {
    padding: 13px 20px;
    padding-left: 55px;
    height: 48px;
    width: 100%;
    font-weight: 500;
    border-radius: 4px;
    font-size: 14px;
    line-height: 22px;
    letter-spacing: 0.5px;
    outline: none;
    color: var(--input-color);
    background-color: var(--white);
    border: none;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
    box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
  }

  .buscador__text:focus,
  .buscador__text:active {
    border: none;
    outline: none;
    box-shadow: 0 4px 8px 0 rgba(21,21,21,.2);
  }

  .input-icon {
    position: absolute;
    top: 0;
    left: 18px;
    height: 48px;
    font-size: 24px;
    line-height: 48px;
    text-align: left;
    color: #c9c9c9;
    -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
  }
}

input:-ms-input-placeholder  {
  color: var(--input-placeholder);
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

input::-moz-placeholder  {
  color: var(--input-placeholder);
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
    transition: all 200ms linear;
}

input:-moz-placeholder  {
  color: var(--input-placeholder);
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

input::-webkit-input-placeholder  {
  color: var(--input-placeholder);
  opacity: 0.7;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

input:focus:-ms-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

input:focus::-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

input:focus:-moz-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}

input:focus::-webkit-input-placeholder  {
  opacity: 0;
  -webkit-transition: all 200ms linear;
  transition: all 200ms linear;
}


</style>
