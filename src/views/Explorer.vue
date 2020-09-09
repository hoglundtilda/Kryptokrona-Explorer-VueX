<template>
  <div>
    <div class="explorer">
      <Header class="header" />
      <Stats class="stats" />
      <Transaction-Pool class="transaction-pool" />
      <RecentBlocks class="recent-blocks" />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import Stats from "../components/explorer/Stats";
import TransactionPool from "../components/explorer/TransactionPool";
import RecentBlocks from "../components/explorer/RecentBlocks";

export default {
  name: "Explorer",
  components: { Header, Stats, TransactionPool, RecentBlocks },
  data: () => {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/transitions.scss";

.nav-overlay {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: $black;
}

.explorer {
  display: grid;
  width: 80vw;
  margin: 0 10em;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-areas: "head head" "stats stats" "transPool transPool" "recentBlocks recentBlocks";
  grid-template-columns: 1fr 1fr;
}

.header {
  grid-area: head;
}

.stats {
  grid-area: stats;
}

.graph {
  grid-area: graph;
}

.search-result {
  grid-area: searchResult;
}

.transaction-pool {
  grid-area: transPool;
}

.recent-blocks {
  grid-area: recentBlocks;
}

@media only screen and (max-width: 700px) {
  .explorer {
    display: flex;
    flex-direction: column;
    padding: 2rem;
  }
}
</style>
