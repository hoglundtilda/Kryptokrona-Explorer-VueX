<template>
  <div class="table">
    <section class="table-header">
      <i class="fas fa-link"></i>
      <h2>Recent Blocks</h2>
      <p class="range">
        Viewing Range: {{ blocks[0].height }} -
        {{ blocks[blocks.length - 1].height }}
      </p>
    </section>
    <div class="search">
      <button @click="newerBlocks" class="btn">
        <i class="fas fa-arrow-left"></i>
        Newer
      </button>
      <!--  <div class="numb">
        <p>No</p>
      </div>-->
      <!-- input binded to data: "input", will take input in method go()-->
      <input @keyup.enter="searchGo" v-model="input" type="text" placeholder="Height (numbers only)" />
      <button @click="searchGo" class="btn">Go</button>
      <button @click="olderBlocks" class="btn">
        Older
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
    <section class="content">
      <section class="stats-grid">
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
      </section>
      <section class="block-table">
        <!--getting [recentBlocks] from store in computed -->
        <li v-for="(block, index) in blocks" :key="index" class="block-content">
          <p class="stats-dark">{{ block.height }}</p>
          <p class="stats-dark">{{ block.size }}</p>
          <a @click="searchByHash(block.hash)" class="hash-a">
            {{
            block.hash
            }}
          </a>
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
        const dateTime = new Date(this.recentBlocks[i].timestamp * 1000);
        const block = {
          height: this.localizeNumber(this.recentBlocks[i].height),
          size: this.localizeNumber(this.recentBlocks[i].cumul_size),
          hash: this.recentBlocks[i].hash,
          difficulty: this.localizeNumber(this.recentBlocks[i].difficulty),
          txs: this.recentBlocks[i].tx_count,
          date: dateTime.toGMTString()
        };
        recentBlocksArr.push(block);
      }
      this.blocks = recentBlocksArr;
    }
  },
  // **************************************************

  methods: {
    searchGo() {
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
    searchByHash(hash) {
      this.$store.dispatch("getBlockByHash_or_id", hash);
      this.$router.push("/result");
    },
    localizeNumber(number) {
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
      font-size: 1.4rem;
      font-family: $fontFamily;
    }

    .numb {
      padding: 0.7rem 1rem;
    }
    .btn {
      padding: 0.7rem 1rem;
      align-items: center;
      cursor: pointer;
      font-size: 1.4rem;

      i {
        padding: 0 0.5rem;
        font-size: 1.4rem;
      }
    }
  }

  .content {
    padding: 2rem 2rem;
    margin-top: 2rem;

    .stats-grid {
      display: grid;
      width: 100%;
      margin-bottom: 1rem;
      grid-template-columns: 8% 8% 48% 10% 6% 20%;
    }
    .stats {
      display: flex;
      align-items: center;
      p {
        padding-right: 0.5rem;
      }

      i {
        padding-right: 1rem;
      }
    }
  }

  .block-table {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .block-content {
      display: grid;
      width: 100%;
      grid-template-columns: 8% 8% 48% 10% 6% 20%;
      margin: 0.8rem 0;

      .hash-a {
        padding-right: 1rem;
      }
    }
  }

  .load-more {
    display: flex;
    align-self: center;
    margin: 1.8rem 0;

    .btn {
      padding: 0.8rem 1.2rem;
      cursor: pointer;
    }
  }
}

@media screen and (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: 8% 6% 52% 8% 6% 18%;
  }
  .stats {
    i {
      display: none;
    }
  }
}

.block-table {
  display: flex;
  flex-direction: column;
  justify-content: center;

  .block-content {
    display: grid;
    width: 100%;
    grid-template-columns: 8% 6% 52% 8% 6% 18%;
    margin: 0.8rem 0;
  }
}
</style>
