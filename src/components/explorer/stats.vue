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
          <p>{{ networkHeight }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-exchange-alt"></i>
          <p>Transactions:</p>
          <p>{{ networkTransactions }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-money-bill-alt"></i>
          <p>Reward:</p>
          <p>{{ reward }}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-certificate"></i>
          <p>Supply:</p>
          <p>{{ supply }}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-percentage"></i>
          <p>Emission:</p>
          <p>{{ emissionPercent }}</p>
          <p>%</p>
        </div>
      </section>
      <section class="right">
        <div class="stats">
          <i class="fas fa-unlock"></i>
          <p>Difficulty:</p>
          <p>{{ networkDifficulty }}</p>
          <p>M</p>
        </div>
        <div class="stats">
          <i class="fas fa-lock"></i>
          <p>Avarage Difficulty:</p>
          <p>{{ avarageDifficulty }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-tachometer-alt"></i>
          <p>Hash Rate:</p>
          <p>{{ networkHashrate }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-clock"></i>
          <p>Avarage Hash Rate:</p>
          <p>{{ avarageHashrate }}</p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      networkHeight: "",
      networkTransactions: "",
      reward: "",
      supply: "",
      networkDifficulty: "",
      emissionPercent: "",
      avarageDifficulty: "",
      networkHashrate: "",
      avarageHashrate: "",
    };
  },
  computed: {
    alreadyGeneratedCoins() {
      return this.$store.state.alreadyGeneratedCoins;
    },
    baseReward() {
      return this.$store.state.baseReward;
    },
    height() {
      return this.$store.state.height;
    },
    transactions() {
      return this.$store.state.transactions;
    },
    difficulty() {
      return this.$store.state.difficulty;
    },
  },
  // **************************************************

  watch: {
    alreadyGeneratedCoins() {
      const totalSupply = 100000000000000;
      let emissionPercent = (this.alreadyGeneratedCoins / totalSupply) * 100;

      this.emissionPercent = emissionPercent.toFixed(4);
      this.supply = this.getReadableCoins(this.alreadyGeneratedCoins, 2);
    },
    // --------------------------------------------------

    baseReward() {
      this.reward = this.getReadableCoins(this.baseReward, 4);
    },
    // --------------------------------------------------

    height() {
      this.networkHeight = this.localizeNumber(this.height);
    },
    // --------------------------------------------------

    transactions() {
      this.networkTransactions = this.localizeNumber(this.transactions);
    },
    // --------------------------------------------------

    difficulty() {
      const blockTargetInterval = 90;
      // Fick blockTargetInterval 30 från början men blev fel, med 90 blir det rätt.
      const hashrate = this.difficulty / blockTargetInterval;

      this.networkHashrate = this.readableHashrate(this.difficulty / blockTargetInterval);
      const difficulty = this.difficulty / 1000000
      this.networkDifficulty = Math.round(difficulty)
    },
  },
  // **************************************************

  methods: {
    getReadableCoins(coins, digits) {
      const coinUnits = 100;
      const amount = (parseInt(coins || 0) / coinUnits).toFixed(
        digits || coinUnits.toString().length - 1
      );
      return this.localizeNumber(amount);
    },
    // --------------------------------------------------

    localizeNumber(number) {
      const numberFormatter = new Intl.NumberFormat("en-US");
      return numberFormatter.format(number);
    },
    // --------------------------------------------------

    readableHashrate(hashrate) {
      let i = 0;
      const byteUnits = [
        " H",
        " kH",
        " MH",
        " GH",
        " TH",
        " PH",
        " EH",
        " ZH",
        " YH",
      ];
      while (hashrate > 1000) {
        hashrate = hashrate / 1000;
        i++;
      }
      return this.localizeNumber(hashrate.toFixed(2)) + byteUnits[i];
    },
    // --------------------------------------------------

    readableDifficulty(difficulty, precision) {
      if (isNaN(parseFloat(difficulty)) || !isFinite(difficulty)) {
        return 0;
      }
      const units = ["", "k", "M", "G", "T", "P"];
      const number = Math.floor(Math.log(difficulty) / Math.log(1000));

      if (units[number] === undefined || units[number] === null) {
        return 0;
      }
      return (
        this.localizeNumber(
          (difficulty / Math.pow(1000, Math.floor(number))).toFixed(precision)
        ) +
        " " +
        units[number]
      );
    },
  },
  // **************************************************

  mounted() {
    this.$store.dispatch("getLastBlock");
    this.$store.dispatch("fetchLiveStats");
    this.$store.dispatch("getPoolTransactions");

    window.setInterval(() => {
      this.$store.dispatch("getLastBlock");
      this.$store.dispatch("fetchLiveStats");
      this.$store.dispatch("getPoolTransactions");
    }, 30000);
  },
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
    height: 2.8rem;
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

    .right {
      margin-right: 2rem;
    }



  
    .stats {
      display: flex;
      margin: 1.5rem 0;

      p {
        padding-right: 0.5rem;
      }

      i {
        display: flex;
        justify-content: center;
        align-self: center;
        width: 4rem;
      }
    }
  }
}
</style>
