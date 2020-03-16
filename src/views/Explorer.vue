<template>
  <div class="explorer">
    <Header class="header" />
    <Stats class="stats" />
    <SearchResult class="search-result" />
    <Transaction-Pool class="transaction-pool" />
    <RecentBlocks class="recent-blocks" />
  </div>
</template>

<script>
import Header from "../components/header";
import Stats from "../components/explorer/stats";
import SearchResult from "../components/explorer/searchResult";
import TransactionPool from "../components/explorer/transactionPool";
import RecentBlocks from "../components/explorer/recentBlocks";

export default {
  name: "Explorer",
  components: { Header, Stats, SearchResult, TransactionPool, RecentBlocks },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.explorer {
  display: grid;
  width: 100%;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-areas: "head head" "stats searchResult" "transPool transPool" "recentBlocks recentBlocks";
  grid-template-columns: 42% 58%;
}

.header {
  grid-area: head;
}

.stats {
  grid-area: stats;
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
  display: grid;
  width: 100%;
  column-gap: 2rem;
  row-gap: 1rem;
  grid-template-areas: "head" "stats" " searchResult" "transPool" "recentBlocks";
  grid-template-columns: 1fr;
  padding: 0 5%;

  
}
}
</style>
