<template>
  <div class="checkTXN">
    <Header class="header" />
  </div>
</template>

<script>
import Header from "../components/header";

export default {
  name: "Explorer",
  components: {
    Header
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";

.checkTXN {
  display: grid;
  width: 100%;
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
</style>