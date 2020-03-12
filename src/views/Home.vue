<template>
  <div class="home">
    <Header class="header" />
    <Stats class="stats" />
    <Chart class="chart" />
    <Transaction-Pool class="transaction-pool" />
    <RecentBlocks class="recent-blocks" />
  </div>
</template>

<script>
import Header from "../components/header";
import Stats from "../components/stats";
import Chart from "../components/chart";
import TransactionPool from "../components/transactionPool";
import RecentBlocks from "../components/recentBlocks";

export default {
  name: "Home",
  components: { Header, Stats, Chart, TransactionPool, RecentBlocks }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.home {
  display: grid;
  column-gap: 2rem;
  row-gap: 2rem;
  grid-template-areas: "head head" "stats chart" "transPool transPool" "recentBlocks recentBlocks";
  grid-template-columns: 50% 50%;
}

.header {
  grid-area: head;
}

.stats {
  grid-area: stats;
}

.chart {
  grid-area: chart;
}

.transaction-pool {
  grid-area: transPool;
}

.recent-blocks {
  grid-area: recentBlocks;
}
</style>
