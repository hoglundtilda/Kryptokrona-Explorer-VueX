<template>
  <div>

    <div class="search">
      <Header class="header" />
      <section class="result">
        <div class="headline">
          <h1 class="search-headline">
            <i class="fas fa-cube"></i>Block
          </h1>
          <h2 class="hash-a">{{ hash }}</h2>
        </div>
        <section class="content">
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
              <p>{{ supply }} XKR</p>
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
              <p>{{ transactionSize }} bytes</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Total block size:</p>
              <p>{{ blockSize }} bytes</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Current txs median:</p>
              <p>{{ txsMedian }} bytes</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Effective txs median:</p>
              <p>{{ effectiveSizeMedian }} bytes</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Reward penalty:</p>
              <p>{{ rewardPenalty }} %</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Base reward:</p>
              <p>{{ baseReward }} XKR</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Transaction fee:</p>
              <p>{{ totalFee }} XKR</p>
            </div>
            <div class="stats">
              <i class="fas fa-question-circle"></i>
              <p>Reward:</p>
              <p>{{ reward }} XKR</p>
            </div>
          </section>
        </section>
      </section>
      <TransactionsBlockSearch />
    </div>
  </div>
</template>

<script>
import Header from "../components/Header";
import TransactionsBlockSearch from "../components/explorer/search/TransactionsBlockSearch";

export default {
  components: {
    Header,
    TransactionsBlockSearch
  },
  data: () => {
    return {
      hash: "",
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
      reward: ""
    };
  },
  computed: {},
  methods: {
    searchData(data) {
      this.hash = data.hash;
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
  },
  mounted() {
    this.searchData(JSON.parse(localStorage.getItem("block")));
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

.search {
  display: grid;
  width: 100%;
  column-gap: 2rem;
  row-gap: 1rem;
}

.header {
  width: 100%;
}

.headline {
  width: 100%;
  display: flex;
  align-items: flex-end;
  .search-headline {
    display: flex;
    margin-right: 1rem;
    font-size: $defaultHeadlineSize;
    color: $menu;
    letter-spacing: 2px;
    flex-wrap: wrap;
    i {
      font-size: $defaultHeadlineIcon;
      padding-right: 1rem;
    }
  }

  .hash-a {
    color: $white;
    font-size: 1.8rem;
    font-weight: 500;
    opacity: 0.5;
    word-wrap: break-word;
  }
}

.content {
  padding: 2rem 0;

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
      display: none;
      justify-content: center;
      align-self: center;
      width: 4rem;
    }
  }
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
    flex-direction: column;
  }

  .stats {
    flex-direction: row;
  }
}
</style>
