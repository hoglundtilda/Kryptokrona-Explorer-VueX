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
@import url("https://fonts.googleapis.com/css?family=Share+Tech+Mono&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 10px;
}

html {
  background: $black;
}

#app {
  max-width: 100vw;
  padding: 0 15%;
  height: auto;
  display: flex;
  justify-content: center;
  background: $black;
  font-family: $fontFamily;
}
</style>
