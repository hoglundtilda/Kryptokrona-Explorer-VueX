<template>
  <div class="header">
    <div @click="goToHome" class="img">
      <img src="../assets/logo-text-light-new.svg" alt="kryptokrona logo" />
    </div>
    <div class="search">
      <input
        @keyup.enter="search"
        v-model="searchInput"
        type="text"
        class="search-input"
        placeholder="Search by block height/hash, transaction hash, payment id"
      />
      <button @click="search" class="search-btn">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>

export default {
  data: () => {
    return {
      searchInput: ""
    };
  },
  methods: {
    search() {
      const path = `/result`;
      if (this.searchInput.length < 64) {
        this.$store.dispatch("getBlockByHeight", this.searchInput);
        if (this.$route.path !== path)
          this.$router.push(path, this.searchInput);
      } else if (this.searchInput.length == 64) {
        this.$store.dispatch("getBlockByHash_or_id", this.searchInput);
      } else {
        console.log("Wrong search input");
      }
    },
    goToHome() {
      if(this.$route.path === "/"){
        location.reload();
      } else {
        this.$router.push("/")
      }
    }
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

  .hamburger {
    display: none;
  }

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
      font-family: $fontFamily;
    }

    .search-btn {
      height: 3.2rem;
      width: 3.2rem;
      background: $searchBTNbg;
      color: $searchBTN;
      border: none;
      cursor: pointer;

      i {
        font-size: 1.6rem;
      }
    }

    :hover {
      background: $dark;
    }
  }
}

@media only screen and (max-width: 700px) {
  .header {
    flex-direction: column;
    height: 15vh;

    .img {
      width: 100%;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;

      img {
        width: 50%;
      }

      .hamburger {
        display: flex;
        width: 4rem;
        height: 4rem;
        border-radius: 100%;
        color: $white;
        justify-content: center;
        align-items: center;
        margin-left: auto;
        align-self: flex-start;
        margin-right: 0.5rem;
        i {
          font-size: 3rem;
        }
      }
    }
    .menu {
      display: none;
      justify-content: center;
    }

    .search {
      width: 100%;
      .search-input {
        width: 100%;
      }
    }
  }
}
</style>
