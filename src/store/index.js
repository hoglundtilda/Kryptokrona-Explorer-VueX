import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "http://explorer.kryptokrona.se:11898",
    alreadyGeneratedCoins: "",
    baseReward: "",
    height: "",
    transactions: "",
    difficulty: "",
    poolTransactions: "",
    recentBlocks: "",
  },
  mutations: {
    updBlocks(state, data) {
      console.log(data)
      state.recentBlocks = data.result.blocks;
      console.log(data.result.blocks)
    },
    updStats(state, data) {
      state.alreadyGeneratedCoins = data.result.block.alreadyGeneratedCoins;
      state.baseReward = data.result.block.baseReward;
    },
    liveStats(state, data) {
      state.height = data.height;
      state.transactions = data.tx_count;
      state.difficulty = data.difficulty;
    },
    poolTransactions(state, data) {
      state.poolTransactions = data.result.transactions;
    },
  },
  actions: {
    async renderRecentBlocks(ctx, height) {
      const currHeight = height;
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_blocks_list_json",
          params: {
            height: currHeight,
          },
        }),
        dataType: "json",
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            // can not change any state data in actions. Sending data to mutations: updBlocks
            console.log(data)
            ctx.commit("updBlocks", data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    // will render block on pageload from mounted in stats.vue
    async renderLastBlock(ctx) {
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "getlastblockheader",
          params: {},
        }),
        dataType: "json",
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            const lastBlockHash = data.result.block_header.hash;
            const url = this.state.api + "/json_rpc";
            fetch(url, {
              method: "POST",
              body: JSON.stringify({
                jsonrpc: "2.0",
                id: "test",
                method: "f_block_json",
                params: {
                  hash: lastBlockHash,
                },
              }),
              dataType: "json",
            })
              .then(response => response.json())
              .then(data => {
                if (data) {
                  ctx.commit("updStats", data);
                }
              });
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    fetchLiveStats(ctx) {
      const url = this.state.api + "/getinfo";
      fetch(url, {
        method: "GET",
        dataType: "json",
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("liveStats", data);
            const height = data.height - 1;
            this.dispatch("renderRecentBlocks", height);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    getPoolTransactions(ctx) {
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_on_transactions_pool_json",
          params: {},
        }),
        dataType: "text",
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("poolTransactions", data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
  },
  modules: {},
});
