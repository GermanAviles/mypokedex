<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import './assets/styles/variables/colors.css';
@import url('https://fonts.googleapis.com/css2?family=Karla:wght@200;300&display=swap');
$material-icons-font-path: '~material-icons/iconfont/';
@import '~material-icons/iconfont/material-icons.scss';

body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Karla', Avenir, sans-serif, Helvetica, Arial;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: var(--background-app);
  width: 100vw;
  height: 100vh;
  padding: 0;
}

</style>
