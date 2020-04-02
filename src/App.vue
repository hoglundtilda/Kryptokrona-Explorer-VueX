<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "./assets/scss/variables.scss";
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 10px;
}

html {
  background: $black;
  width: 100vw;
  display: flex;
  justify-content: center;
}

#app {
  height: auto;
  display: flex;
  padding: 2rem;
  flex-direction: column;
  justify-content: center;
  background: $black;
  font-family: $fontFamily;
}
</style>
