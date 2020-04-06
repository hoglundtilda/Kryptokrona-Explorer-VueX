<template>
  <div class="menu">
    <nav>
      <li @click="explorer">
        <a>
          <i class="fas fa-cubes"></i>Block Explorer
        </a>
      </li>
      <li @click="checkTXN">
        <a>
          <i class="fas fa-exchange-alt"></i>Check TXNs
        </a>
      </li>
      <li>
        <a >
          <i class="fas fa-gavel"></i>Pool
        </a>
      </li>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    explorer() {
      this.$router.push("/");
    },
    checkTXN() {
      this.$router.push("/check_txn");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/textStyles.scss";

.menu nav {
  display: flex;
  justify-content: space-between;
  margin: 0 6rem;

  li {
    list-style: none;

    a {
      color: $menu;
      font-size: 1.8rem;
      text-decoration: none;
    }

    a:hover {
      cursor: pointer;
      color: $menuHover;
      opacity: 0.5;
    }

    i,
    .apiIcon {
      padding-right: 1rem;
      font-weight: 600;
      font-size: 1.6rem;
    }
  }
}

@media screen and (max-width: 1200px) {
 i {
   display: none;
 }

.menu nav {
   margin: 0 2rem;

}

}

</style>
