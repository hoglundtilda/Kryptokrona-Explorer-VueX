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
        <a>
          <i class="fas fa-gavel"></i>Pools
        </a>
      </li>
      <li>
        <a>
          <span class="apiIcon">&#60;/&#62;</span>API
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
      this.$router.push("/checkTXN");
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
      font-size: 2.2rem;
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
      font-size: 2.2rem;
    }
  }
}
</style>