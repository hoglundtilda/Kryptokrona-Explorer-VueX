<template>
  <div class="header">
    <div class="img">
      <img src="../assets/logo-text-light-new.svg" alt="kryptokrona logo" />
    </div>
    <Menu class="menu" />
    <div class="search">
      <input
        type="text"
        class="search-input"
        placeholder="Search by block height/hash, transaction hash, payment id"
      />
      <button class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
import Menu from "./menu.vue";
export default {
  components: {
    Menu
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 8rem;
  border-bottom: 2px solid $headerBorder;

  .img {
    width: 20%;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .menu {
    width: 50%;
  }

  .search {
    width: auto;
    display: flex;
    box-shadow: $boxShadow;

    .search-input {
      height: 3.2rem;
      width: 33rem;
      font-family: $fontFamily;
      font-size: 1.6rem;
      background: $dark;
      color: $white;
      border: none;
      padding: 0 0.5rem;
    }

    ::placeholder {
      font-size: 1.2rem;
      opacity: 0.3;
      color: $placeholder;
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
        "Lucida Sans", Arial, sans-serif;
    }

    .search-btn {
      height: 3.2rem;
      width: 3.2rem;
      background: $searchBTNbg;
      color: $searchBTN;
      border: none;
      cursor: pointer;

      i {
        font-size: 1.8rem;
      }
    }
  }
}
</style>