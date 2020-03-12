<template>
  <div class="menu">
    <nav>
      <li>
        <a href>
          <i class="fas fa-cubes"></i>Block Explorer
        </a>
      </li>
      <li>
        <a href>
          <i class="fas fa-exchange-alt"></i>Check TXNs
        </a>
      </li>
      <li>
        <a href>
          <i class="fas fa-gavel"></i>Pools
        </a>
      </li>
      <li>
        <a href>
          <span class="apiIcon">&#60;/&#62;</span>API
        </a>
      </li>
    </nav>
  </div>
</template>

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
      color: $white;
      font-size: 2.2rem;
      text-decoration: none;
    }

    a:hover {
      color: $orange;
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