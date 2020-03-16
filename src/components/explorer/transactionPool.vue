<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-exchange-alt"></i>
      <h2>Transaction Pool</h2>
      <div @mouseenter="show = true" @mouseleave="show = false" class="info">
        <div v-if="show" class="info-text">
          <p>
            Recent transactions waiting to be included into a block. Once it
            happens a transaction gets into the blockchain and becomes
            confirmed.
          </p>
        </div>
        <i class="fas fa-question-circle"></i>
      </div>
    </section>
    <section class="content">
      <div class="stats">
        <i class="fas fa-money-bill-alt"></i>
        <p>Amount</p>
      </div>
      <div class="stats">
        <i class="fas fa-tag"></i>
        <p>Fee</p>
      </div>
      <div class="stats">
        <i class="fas fa-archive"></i>
        <p>Size</p>
      </div>
      <div class="stats">
        <i class="fas fa-paw"></i>
        <p>Hash</p>
      </div>
    </section>
    <li
      v-for="(transaction, index) in poolTransactions"
      :key="index"
      class="poolTransactions"
    >
      <p class="stats-dark">{{ transaction.amount_out }}</p>
      <p class="stats-dark">{{ transaction.fee }}</p>
      <p class="stats-dark">{{ transaction.size }}</p>
      <a @click="searchByHash(transaction.hash)" class="hash-a">{{
        transaction.hash
      }}</a>
    </li>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      show: false,
      poolTransactions: "",
    };
  },
  computed: {
    getPoolTransactions() {
      console.log(this.$store.state.getPoolTransactions.poolTransactions)
      return this.$store.state.getPoolTransactions.poolTransactions;
    },
  },
  // **************************************************

  watch: {
    getPoolTransactions() {
      const poolTransactionsArr = [];
      for (let i = 0; i < this.getPoolTransactions.length; i++) {
        const transaction = {
          amount_out: this.getReadableCoins(
            this.getPoolTransactions[i].amount_out,
            4,
            true
          ),
          fee: this.getReadableCoins(this.getPoolTransactions[i].fee, 4, true),
          size: this.localizeNumber(this.getPoolTransactions[i].fee),
          hash: this.getPoolTransactions[i].hash,
        };
        poolTransactionsArr.push(transaction);
      }
      this.poolTransactions = poolTransactionsArr;
    },
  },
  // **************************************************

  methods: {
    getReadableCoins(coins, digits) {
      const coinUnits = 100; // enter in the amount of atomic units in 1 coin, eg. 100 shells = 1 trtl

      const amount = (parseInt(coins || 0) / coinUnits).toFixed(
        digits || coinUnits.toString().length - 1
      );
      return this.localizeNumber(amount);
    },
    // --------------------------------------------------

    localizeNumber(number) {
      const numberFormatter = new Intl.NumberFormat("en-US"); // US formatting, force commas.
      return numberFormatter.format(number);
    },
    // --------------------------------------------------

    formatPaymentLink(hash) {
      const transactionExplorer = "?hash={hash}#blockchain_transaction";
      transactionExplorer.replace("{hash}", hash);
    },
    // --------------------------------------------------

    searchByHash(hash) {
      this.$store.dispatch("getBlockByHash_or_id", hash);
      this.$router.push("/result");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/textStyles.scss";

.table {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 1rem 0.5rem 0.5rem 0;
  box-shadow: $boxShadow;
  background: $tablebg;

  .table-header {
    display: flex;
    align-items: center;
    background: $tableHeader;
    height: 2.8rem;
    padding: 0 0.7rem;

    i {
      padding-right: 0.5rem;
    }

    .info {
      margin-left: auto;

      .info-text {
        position: absolute;
        width: 30rem;
        right: 20rem;
        border-radius: 10px;
        padding: 1rem;
      }
    }
  }

  .content {
    padding: 2rem 3.2rem;
    display: grid;
    row-gap: 1.8rem;
    grid-template-columns: 18% 18% 18% 42%;

    .stats {
      display: flex;
      align-items: center;
      i {
        padding-right: 1rem;
      }
    }
  }

  .poolTransactions {
    list-style: none;
    padding: 2rem 3.2rem;
    display: grid;
    row-gap: 1.8rem;
    grid-template-columns: 18% 18% 18% 42%;
  }
}
</style>
