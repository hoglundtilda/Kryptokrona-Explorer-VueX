<template>
  <div class="nav-overlay">
    <section class="content">
      <div class="header">
        <button @click="closeNav" class="nav-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <section class="nav">
        <p @click="blockExplorer" class="pop">Block Explorer</p>
        <p @click="checkTXN" class="pop">Check TXN</p>
        <p @click="pool" class="pop">Pool</p>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  methods: {
    closeNav() {
      this.$store.state.nav = false;
    },
    blockExplorer() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
        this.closeNav();
      } else {
        this.closeNav();
      }
    },
    checkTXN() {
      if (this.$route.path !== "/check_txn") {
        this.$router.push("/check_txn");
        this.closeNav();
      } else {
        this.closeNav();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
//@import "../assets/scss/transitions.scss";

.nav-overlay {
  width: 100vw;
  height: 100vh;
  background: $black;
}

.content {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 2rem;

  .header {
    display: flex;
    align-self: flex-end;

    .nav-btn {
      background: $black;
      color: $white;
      height: 4rem;
      width: 4rem;
      border: none;
      cursor: pointer;

      i {
        font-size: 3rem;
      }
    }
  }

  .nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $white;
    height: 60rem;
    p {
      font-size: 2.6rem;
      font-weight: 500;
      font-family: $fontFamily;
      cursor: pointer;
      margin: 2rem;
    }
  }
}
</style>