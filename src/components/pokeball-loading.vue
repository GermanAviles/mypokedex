<template>
	<div class="pokeball">
		<div class="pokeball-content"></div>
	</div>
</template>

<script>
export default {
  name: 'pokeball-loading',
}
</script>

<style lang="scss">

*, *:before, *:after {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}

.pokeball {
  position: relative;
  width: 150px;
  height: 150px;
  background-color: var(--white);
  border: 5px solid var(--black);
  border-radius: 50%;
  box-shadow: inset -10px 10px 0 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  animation: gira 4s infinite;
  margin: 20px auto;
}

.pokeball:before, .pokeball:after {
  content: "";
  position: absolute;
  left: 0;
}

.pokeball:before {
  background-color: var(--red-pokeball);
  width: 100%;
  height: 50%;
}

.pokeball:after {
  top: calc(50% - 10px);
  width: 100%;
  height: 20px;
  background-color: var(--black);
  left: 0;
}

.pokeball-content {
  width: 50px;
  height: 50px;
  background-color: var(--white);
  border: 10px solid var(--black);
  border-radius: 50%;
  position: absolute;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
  z-index: 10;
}
.pokeball-content:before {
  content: "";
  position: absolute;
  top: calc(50% - 10px);
  left: calc(50% - 10px);
  width: 20px;
  height: 20px;
  background-color: var(--white);
  border: 3px solid var(--black);
  border-radius: 50%;
  z-index: 10;
}

@keyframes gira {
  0% { transform: rotate(-45deg); }
  50% { transform: rotate(45deg); }
  100% { transform: rotate(-45deg); }
}

</style>
