<template>
  <div>
    <transition name="fade">
      <NavOverlay v-if="this.$store.state.nav" @closeNav="nav" class="nav-overlay" />
    </transition>
    <div class="outputs">
      <Header class="header" />
      <section class="result">
        <section class="transaction">
          <div class="headline">
            <h1 class="transaction-headline">
              <i class="fas fa-exchange-alt"></i>Transaction
            </h1>
          </div>
          <div class="stats">
              <p>Hash: {{transaction.hash}}</p>
              <p>Confirmations: {{transaction.confirmations}}</p>
              <p>Fee: {{transaction.fee}}</p>
              <p>Sum of Outputs: {{transaction.sumOutputs}}</p>
              <p>Size: {{transaction.size}}</p>
          </div>
        </section>
        <section class="block">
            <div class="headline">
            <h1 class="transaction-headline">
              <i class="fas fa-cubes"></i>In Block
            </h1>
          </div>
            <div class="stats">
                <p>Hash: {{block.hash}}</p>
                <p>Height: {{block.height}}</p>
                <p>Timestamp: {{block.timestamp}}</p>
            </div>
        </section>
      </section>
    </div>
  </div>
</template>

<script>
import NavOverlay from "../components/navOverlay";
import Header from "../components/header";
import TransactionsBlockSearch from "../components/explorer/search/transactionsBlockSearch";

export default {
  components: {
    NavOverlay,
    Header,
    TransactionsBlockSearch
  },
  data: () => {
    return {
      transaction: {
          hash: "",
          confirmations: "",
          fee: "",
          sumOutputs: "",
          size: ""
      },
      block: {
          hash: "",
          height: "",
          timestamp: ""
      }

    };
  },
  computed: {
    searchData() {
      return this.$store.state.getSearchData.searchData;
    }
  },
  watch: {
    searchData() {
      const data = this.searchData;
      this.supply = this.getReadableCoins(data.alreadyGeneratedCoins, 2);
      this.height = this.localizeNumber(data.height);

      const dateTime = new Date(data.timestamp * 1000);
      this.timestamp = dateTime.toGMTString();

      this.difficulty = this.localizeNumber(data.difficulty);
      this.orphan = this.checkOrphan(data.orphan);
      this.transactions = data.transactions.length;
      this.totTransactions = this.localizeNumber(
        data.alreadyGeneratedTransactions
      );
      this.transactionSize = data.transactionsCumulativeSize;
      this.blockSize = data.blockSize;
      this.txsMedian = data.sizeMedian;
      this.effectiveSizeMedian = this.localizeNumber(data.effectiveSizeMedian);
      this.rewardPenalty = data.penalty;
      this.baseReward = this.localizeNumber(data.baseReward);
      this.totalFee = data.totalFeeAmount;
      this.reward = this.localizeNumber(data.reward);
    }
  },
  methods: {
    localizeNumber(number) {
      const numberFormatter = new Intl.NumberFormat("en-US");
      return numberFormatter.format(number);
    },
    getReadableCoins(coins, digits) {
      const coinUnits = 100;
      const amount = (parseInt(coins || 0) / coinUnits).toFixed(
        digits || coinUnits.toString().length - 1
      );
      return this.localizeNumber(amount);
    },
    checkOrphan(orphan) {
      if (orphan === true) {
        return "YES";
      } else {
        return "NO";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/textStyles.scss";
@import "../assets/scss/transitions.scss";

.nav-overlay {
  position: absolute;
  z-index: 1;
  height: 100%;
  width: 100%;
  background-color: $black;
}


@media only screen and (max-width: 700px) {
  .headline {
    flex-direction: column;
    width: 100%;
    margin-top: 3rem;
    h1 {
      align-self: flex-start;
    }

    h2 {
      width: 100%;
    }
  }

  .search {
    display: flex;
    flex-direction: column;
    width: 100vw;
    padding: 2rem;
  }

  .content {
    width: 100%;
  }

  .stats {
    flex-direction: column;
  }
}
</style>
