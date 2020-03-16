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
    recentBlocks: ""
  },
  mutations: {
    clearState(state) {
      // Because computed has its own chache, state needs to be wiped out to show stats when switching views.
      state.alreadyGeneratedCoins = 0;
      state.baseReward = 0;
      state.height = 0;
      state.transactions = 0;
      state.difficulty = 0;
    },
    updBlocks(state, data) {
      state.recentBlocks = data.result.blocks;
      console.log(data.result.blocks);
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
    //  CHECK TXNs ------------------
    checkTXNs(state, data) {
      state;
    }
  },
  // **************************************************

  actions: {
    async getRecentBlocks(ctx, height) {
      const currHeight = height;
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_blocks_list_json",
          params: {
            height: currHeight
          }
        }),
        dataType: "json"
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("updBlocks", data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    // --------------------------------------------------
    async getLastBlock(ctx) {
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "getlastblockheader",
          params: {}
        }),
        dataType: "json"
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
                  hash: lastBlockHash
                }
              }),
              dataType: "json"
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
    // --------------------------------------------------

    fetchLiveStats(ctx) {
      ctx.commit("clearState");

      const url = this.state.api + "/getinfo";
      fetch(url, {
        method: "GET",
        dataType: "json"
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("liveStats", data);
            const height = data.height - 1;
            this.dispatch("getRecentBlocks", height);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    // --------------------------------------------------

    getPoolTransactions(ctx) {
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_on_transactions_pool_json",
          params: {}
        }),
        dataType: "text"
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

    // *********************************
    checkTXN(ctx, transactionHash) {
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "blockexplorer",
          method: "f_transaction_json",
          params: {
            hash: transactionHash
          }
        }),
        dataType: "json"
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("checkTXNs", data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    }
  },
  modules: {}
});
