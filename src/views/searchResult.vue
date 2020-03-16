<template>
  <div class="search">
    <Header class="header" />
    <section class="result">
      <div class="headline">
        <h1 class="search-headline">
          <i class="fas fa-cube"></i>Block
        </h1>
        <h2>44efbeec3502bc3fe923184893a11020e96b6be302265815a65ec61d318c0480</h2>
      </div>
      <section class="content">
        <section class="left">
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Height:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Timestamp:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Version:</p>
            <p></p>
            <p>XKR</p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Difficulty:</p>
            <p></p>
            <p>XKR</p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Orphan:</p>
            <p></p>
            <p>%</p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Transactions:</p>
            <p></p>
            <p>M</p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Total coins in the network:</p>
            <p>{{supply}}</p>
            <p>M</p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Total transactions in the network:</p>
            <p></p>
            <p>M</p>
          </div>
        </section>
        <section class="right">
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Total transactions size, bytes:</p>
            <p></p>
            <p>M</p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Total block size, bytes:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Current txs median, bytes:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Effective txs median, bytes:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Reward penalty:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Base reward:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Transaction fee:</p>
            <p></p>
          </div>
          <div class="stats">
            <i class="fas fa-question-circle"></i>
            <p>Reward:</p>
            <p></p>
          </div>
        </section>
      </section>
    </section>
  </div>
</template>

<script>
import Header from "../components/header";

export default {
  components: {
    Header
  },
  data: () => {
    return {
      supply: ""
    };
  },
  computed: {
    searchData() {
      return this.$store.state.getSearchData.searchBlock;
    }
  },
  watch: {
    searchData() {
      this.supply = this.getReadableCoins(
        this.searchData.alreadyGeneratedCoins,
        2
      );
    }
  },
  methods: {
    getReadableCoins(coins, digits) {
      const coinUnits = 100;
      const amount = (parseInt(coins || 0) / coinUnits).toFixed(
        digits || coinUnits.toString().length - 1
      );
      return this.localizeNumber(amount);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables.scss";
@import "../assets/scss/textStyles.scss";

.search {
  display: grid;
  width: 100%;
  column-gap: 2rem;
  row-gap: 1rem;
}

.headline {
  display: flex;
  align-items: center;

  .search-headline {
    display: flex;
    margin-right: 2rem;
    font-size: $defaultHeadlineSize;
    color: $menu;
    letter-spacing: 2px;

    i {
      font-size: $defaultHeadlineIcon;
      padding-right: 1rem;
    }
  }

  h2 {
    color: $white;
    font-size: 1.8rem;
    opacity: 0.5;
  }
}

.content {
  padding: 2rem 0;
  width: 55%;
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
</style>
