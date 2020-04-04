<template>
  <div>
    <transition name="fade">
      <NavOverlay v-if="this.$store.state.nav" @closeNav="nav" class="nav-overlay" />
    </transition>
    <div class="explorer">
      <Header class="header" />
      <Stats class="stats" />
      <Graph class="graph" />
      <Transaction-Pool class="transaction-pool" />
      <RecentBlocks class="recent-blocks" />
    </div>
  </div>
</template>

<script>
import Header from "../components/header";
import Stats from "../components/explorer/stats";
import Graph from "../components/explorer/graph";
import TransactionPool from "../components/explorer/transactionPool";
import RecentBlocks from "../components/explorer/recentBlocks";
import NavOverlay from "../components/navOverlay";

export default {
  name: "Explorer",
  components: { Header, Stats, Graph, TransactionPool, RecentBlocks, NavOverlay },
  data: () => {
    return {};
  },
  methods: {}
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
  width: 100%;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-areas: "head head" "stats graph" "transPool transPool" "recentBlocks recentBlocks";
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
    grid-template-columns: 1fr;
    column-gap: 0;
    padding: 2rem;
  }
}
</style>
