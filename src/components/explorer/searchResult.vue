<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-cube"></i>
      <h2>Block</h2>
      <h3 class="block-hash">{{searchData.hash}}</h3>
    </section>
    <section class="content" v-if="showResult">
      <section class="left">
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Height:</p>
          <p>{{ height }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Timestamp:</p>
          <p>{{ timestamp }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Version:</p>
          <p>{{ searchData.major_version }}.{{ searchData.minor_version }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Difficulty:</p>
          <p>{{ difficulty }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Orphan:</p>
          <p>{{ orphan }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Transactions:</p>
          <p>{{ transactions }}</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Total network supply:</p>
          <p>{{ supply }}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Total network transactions:</p>
          <p>{{ totTransactions }}</p>
        </div>
      </section>
      <section class="right">
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Total transactions size:</p>
          <p>{{ transactionSize }}</p>
          <p>bytes</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Total block size:</p>
          <p>{{ blockSize }}</p>
          <p>bytes</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Current txs median:</p>
          <p>{{ txsMedian }}</p>
          <p>bytes</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Effective txs median:</p>
          <p>{{ effectiveSizeMedian }}</p>
          <p>bytes</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Reward penalty:</p>
          <p>{{ rewardPenalty }}</p>
          <p>%</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Base reward:</p>
          <p>{{ baseReward }}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Transaction fee:</p>
          <p>{{ totalFee }}</p>
          <p>XKR</p>
        </div>
        <div class="stats">
          <i class="fas fa-question-circle"></i>
          <p>Reward:</p>
          <p></p>
          <p>XKR</p>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
export default {
  components: {
  },
  data: () => {
    return {
      supply: "",
      height: "",
      timestamp: "",
      version: "",
      difficulty: "",
      orphan: "",
      transactions: "",
      totTransactions: "",
      transactionSize: "",
      blockSize: "",
      txsMedian: "",
      effectiveSizeMedian: "",
      rewardPenalty: "",
      baseReward: "",
      totalFee: "",
      showResult: false
    };
  },
  computed: {
    searchData() {
      return this.$store.state.getSearchData.searchData;
    },
  },
  watch: {
    searchData() {
        if(this.searchData.hash) {this.showResult = true }
        else { this.showResult = false}
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
    },
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

    .block-hash {
        color: $white;
        opacity: 0.5;
        font-size: 1.6rem;
        padding: 0.3rem 0 0 1rem;
        font-weight: 500;

    }

  
  }

  .content {
    padding: 2rem 2rem;
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
    margin: 1rem 0;

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

@media only screen and (max-width: 700px) {
 .content {
  display: flex;
  flex-direction: column;
  width: 100%;
 

  
}
}
</style>
