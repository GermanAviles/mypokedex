<template>
	<div id="toast">
    <div id="toast__icon">
      <span class="material-icons-outlined">{{ icon }}</span>
    </div>
    <div id="toast__message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  name: 'toast',
  props: {
    icon: String,
    message: String
  }
}
</script>

<style lang="scss">

#toast {
  visibility: hidden;
  max-width: 50px;
  height: 50px;
  margin: auto;
  background-color: var(--primary);
  color: #fff;
  text-align: center;
  border-radius: 2px;
  position: fixed;
  z-index: 100;
  left: 0;
  right:0;
  bottom: 30px;
  font-size: 17px;
  white-space: nowrap;

  #toast__icon{
    width: 50px;
    height: 50px;
    float: left;
    padding-top: 16px;
    padding-bottom: 16px;
    box-sizing: border-box;
    background-color: var(--color-sky);
    color: #fff;
  }

  #toast__message{
    color: #fff;
    padding: 10px;
    overflow: hidden;
    white-space: nowrap;
  }
}

#toast.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 2s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, expand 0.5s 0.5s,stay 3s 1s, shrink 0.5s 4s, fadeout 0.5s 4.5s;
}

@-webkit-keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@keyframes fadein {
  from {bottom: 0; opacity: 0;}
  to {bottom: 30px; opacity: 1;}
}

@-webkit-keyframes expand {
  from {min-width: 50px}
  to {min-width: 350px}
}

@keyframes expand {
  from {min-width: 50px}
  to {min-width: 270px}
}

@-webkit-keyframes stay {
  from {min-width: 270px}
  to {min-width: 270px}
}

@keyframes stay {
  from {min-width: 270px}
  to {min-width: 270px}
}
@-webkit-keyframes shrink {
  from {min-width: 270px;}
  to {min-width: 50px;}
}

@keyframes shrink {
  from {min-width: 270px;}
  to {min-width: 50px;}
}

@-webkit-keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 60px; opacity: 0;}
}

@keyframes fadeout {
  from {bottom: 30px; opacity: 1;}
  to {bottom: 60px; opacity: 0;}
}

</style>
