<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-exchange-alt"></i>
      <h2>Transactions</h2>
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
    <li v-for="(transaction, index) in transactions" :key="index" class="poolTransactions">
      <p class="stats-dark">{{ transaction.amount_out }}</p>
      <p class="stats-dark">{{ transaction.fee }}</p>
      <p class="stats-dark">{{ transaction.size }}</p>
      <a @click="getOutputs(transaction.hash)" class="hash-a">
        {{
        transaction.hash
        }}
      </a>
    </li>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      show: false,
      transactions: []
    };
  },
  computed: {},
  // **************************************************

  watch: {},
  // **************************************************

  methods: {
    getTransactions(transactions) {
      const transactionsArr = [];
      for (let i = 0; i < transactions.length; i++) {
        const transaction = {
          amount_out: this.getReadableCoins(
            transactions[i].amount_out,
            4,
            true
          ),
          fee: this.getReadableCoins(transactions[i].fee, 4, true),
          size: this.localizeNumber(transactions[i].fee),
          hash: transactions[i].hash
        };
        transactionsArr.push(transaction);
      }
      this.transactions = transactionsArr;
    },
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
    getOutputs(hash) {
      this.$store.dispatch("getOutputs", hash);
      this.$router.push("blockchain_transaction");
    }
  },
  mounted() {
    const transactions = JSON.parse(localStorage.getItem("block"));
    this.getTransactions(transactions.transactions);
  }
};
</script>

<style lang="scss" scoped>
@import "../../../assets/scss/variables.scss";
@import "../../../assets/scss/textStyles.scss";

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
