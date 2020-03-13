<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-chart-bar"></i>
      <h2>Stats</h2>
    </section>
    <section class="content">
      <section class="left">
        <div class="stats">
          <i class="fas fa-bars"></i>
          <p>Height:</p>
          <p>{{stats.networkHeight}}</p>
        </div>
        <div class="stats">
          <i class="fas fa-exchange-alt"></i>
          <p>Transactions:</p>
          <p>{{stats.networkTransactions}}</p>
        </div>
        <div class="stats">
          <i class="fas fa-money-bill-alt"></i>
          <p>Reward:</p>
          <p>{{stats.currentReward}}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-certificate"></i>
          <p>Supply:</p>
          <p>{{stats.totalCoins}}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-percentage"></i>
          <p>Emission:</p>
          <p>{{stats.networkEmission}}</p>
          <p>%</p>
        </div>
      </section>
      <section class="right">
        <div class="stats">
          <i class="fas fa-unlock"></i>
          <p>Difficulty:</p>
          <p>1</p>
          <p>M</p>
        </div>
        <div class="stats">
          <i class="fas fa-lock"></i>
          <p>Avarage Difficulty:</p>
          <p>....</p>
        </div>
        <div class="stats">
          <i class="fas fa-tachometer-alt"></i>
          <p>Hash Rate:</p>
          <p>{{stats.networkHashrate}}</p>
          <p>kH</p>
        </div>
        <div class="stats">
          <i class="fas fa-clock"></i>
          <p>Avarage Hash Rate:</p>
          <p>...</p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      // created in watch: lastBlock, binded to template elements
      stats: {}
    };
  },
  computed: {
    lastBlock() {
      return this.$store.state.lastBlock;
    }
  },
  watch: {
    lastBlock() {
      const blockTargetInterval = 30; // enter the block interval in seconds
      const totalSupply = 100000000000000; // enter the total supply in atomic units
      const coinUnits = 100; // enter in the amount of atomic units in 1 coin, eg. 100 shells = 1 trtl
      const refreshDelay = 30000;
      const networkHashrate = this.lastBlock.difficulty / blockTargetInterval;
      let emissionPercent =
        (this.lastBlock.alreadyGeneratedCoins / totalSupply) * 100;
      emissionPercent = emissionPercent.toFixed(4);

      const stats = {
        networkHashrate: networkHashrate,
        networkEmission: emissionPercent,
        networkHeight: this.lastBlock.height,
        networkTransactions: this.lastBlock.transactions[0].amount_out,
        networkDifficulty: this.lastBlock.difficulty,
        totalCoins: this.lastBlock.alreadyGeneratedCoins,
        currentReward: this.lastBlock.baseReward
      };
      console.log(this.lastBlock);
      this.stats = stats;
    }
  },
  mounted() {
    this.$store.dispatch("renderLastBlock");
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/textStyles.scss";

.table {
  display: flex;
  flex-direction: column;
  margin: 1rem 0.5rem 0.5rem 0;
  box-shadow: $boxShadow;
  width: 100%;
  background: $tablebg;

  .table-header {
    display: flex;
    background: $tableHeader;
    height: 3.6rem;
    padding: 0 0.7rem;
    align-items: center;

    i {
      padding-right: 0.5rem;
    }
  }

  .content {
    padding: 2rem 3.2rem;
    width: 100%;
    display: flex;
    justify-content: space-between;

    .left,
    .right {
      display: flex;
      flex-direction: column;
    }
    .stats {
      display: flex;
      margin: 2rem 0;

      p {
        padding-right: 0.5rem;
      }

      i {
        padding-right: 1.5rem;
      }
    }
  }
}
</style>