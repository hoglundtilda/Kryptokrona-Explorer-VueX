<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-link"></i>
      <h2>Recent Blocks</h2>
      <p class="range">Viewing Range: 311.003 - 310.344</p>
    </section>
    <div class="search">
      <button @click="newerBlocks" class="btn">
        <i class="fas fa-arrow-left"></i>
        Newer
      </button>
      <div class="numb">
        <p>No</p>
      </div>
      <!-- input binded to data: "input", will take input in method go()-->
      <input @keyup.enter="go" v-model="input" type="text" placeholder="Height" />
      <button @click="go" class="btn">Go</button>
      <button @click="olderBlocks" class="btn">
        Older
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    <section class="content">
      <div class="stats">
        <i class="fas fa-bars"></i>
        <p>Height</p>
      </div>
      <div class="stats">
        <i class="fas fa-archive"></i>
        <p>Size</p>
      </div>
      <div class="stats">
        <i class="fas fa-paw"></i>
        <p>Hash</p>
      </div>
      <div class="stats">
        <i class="fas fa-unlock"></i>
        <p>Difficulty</p>
      </div>
      <div class="stats">
        <i class="fas fa-bars"></i>
        <p>TXS</p>
      </div>
      <div class="stats">
        <i class="fas fa-clock"></i>
        <p>Date</p>
      </div>
      <section class="block-table">
        <!--getting [recentBlocks] from store in computed -->
        <li v-for="(block, index) in blocks" :key="index" class="block-content">
          <p class="stats-dark">{{ block.height }}</p>
          <p class="stats-dark">{{ block.size }}</p>
          <a href class="hash-a">{{ block.hash }}</a>
          <p class="stats-dark">{{ block.difficulty }}</p>
          <p class="stats-dark">{{ block.txs }}</p>
          <p class="stats-dark">{{ block.date }}</p>
        </li>
      </section>
    </section>
    <div class="load-more">
      <button @click="loadMoreBlocks" class="btn">Load More</button>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      input: "",
      blocks: []
    };
  },
  computed: {
    recentBlocks() {
      return this.$store.state.getBlocksData.recentBlocks;
    }
  },
  // **************************************************

  watch: {
    recentBlocks() {
      const recentBlocksArr = [];
      for (let i = 0; i < this.recentBlocks.length; i++) {
        let dateTime = new Date(this.recentBlocks[i].timestamp * 1000);
        dateTime.toLocaleDateString;
        const block = {
          height: this.localizeNumber(this.recentBlocks[i].height),
          size: this.localizeNumber(this.recentBlocks[i].cumul_size),
          hash: this.recentBlocks[i].hash,
          difficulty: this.localizeNumber(this.recentBlocks[i].difficulty),
          txs: this.recentBlocks[i].tx_count,
          date: dateTime
        };
        recentBlocksArr.push(block);
      }
      this.blocks = recentBlocksArr;
    }
  },
  // **************************************************

  methods: {
    go() {
      // search with height
      const height = parseInt(this.input);
      this.$store.dispatch("getRecentBlocks", height);
    },
    newerBlocks() {
      const height = this.recentBlocks[0].height + 31;
      this.$store.dispatch("getRecentBlocks", height);
    },
    olderBlocks() {
      const height = this.recentBlocks[0].height - 31;
      this.$store.dispatch("getRecentBlocks", height);
    },
    loadMoreBlocks() {
      const height = this.recentBlocks[0].height - 31;
      this.$store.dispatch("getRecentBlocks", height);
    },
    localizeNumber(number) {
      // US formatting, force commas.
      const numberFormatter = new Intl.NumberFormat("en-US");
      return numberFormatter.format(number);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables.scss";
@import "../../assets/scss/textStyles.scss";

.table {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1rem 0.5rem 0.5rem 0;
  box-shadow: $boxShadow;
  width: 100%;
  height: auto;
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

    .range {
      margin-left: auto;
    }
  }

  .search {
    display: flex;
    align-self: center;
    justify-content: center;
    width: 90%;
    margin: 3.2rem 3.2rem 0 3.2rem;
    box-shadow: $boxShadow;

    input {
      background: $dark;
      border: none;
      width: 100%;
      padding: 0 1rem;
      color: $white;
      font-family: $fontFamily;
      font-size: 1.6rem;
    }

    ::placeholder {
      color: $white;
      opacity: 0.5;
      font-size: 1.6rem;
      font-family: $fontFamily;
    }

    .numb {
      padding: 0.7rem 1rem;
    }
    .btn {
      padding: 0.7rem 1rem;
      align-items: center;
      cursor: pointer;

      i {
        padding: 0 0.5rem;
      }
    }
  }

  .content {
    margin: 0 2.2rem;
    padding: 2rem 3.2rem;
    display: grid;
    justify-content: center;
    grid-template-columns: 10rem 10rem 52rem 14rem 8rem 25rem;

    .stats {
      display: flex;
      margin: 1rem 0;

      p {
        padding-right: 0.5rem;
      }

      i {
        padding-right: 1.5rem;
      }
    }

    .block-table {
      display: flex;
      flex-direction: column;

      .block-content {
        display: grid;
        grid-template-columns: 10rem 10rem 52rem 14rem 8rem 25rem;
        margin: 0.8rem 0;
      }
    }
  }

  .load-more {
    display: flex;
    align-self: center;
    margin: 1.8rem 0;

    .btn {
      padding: 1rem 1.2rem;
      cursor: pointer;
    }
  }
}
</style>
