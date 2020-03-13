import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: "http://explorer.kryptokrona.se:11898",
    //
    lastBlock: {},
    // example block array, recieved in recentBlocks.vue in computed.
    recentBlocks: [
      {
        height: "311.567",
        size: "430",
        hash:
          "8e3f20988efbbfa5be5478fa158c771d4461cac97c5cd6846ac17cac2bedf689",
        difficulty: "311.344,267",
        txs: "1",
        date: "2020-03-11 09:44"
      }
    ]
  },
  mutations: {
    updBlocks(state, data) {
      state.recentBlocks = data;
    },
    updStats(state, data) {
      state.lastBlock = data.result.block;
    }
  },
  actions: {
    async xhrGetBlocks(ctx) {
      const currHeight = this.recentBlocks[0].height;
      const openHeight = currHeight - 31 < 0 ? 0 : currHeight - 31;
      const url = this.state.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_blocks_list_json",
          params: {
            height: openHeight
          }
        }),
        dataType: "json",
        cache: "false"
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          if (data.success) {
            // can not change any state data in actions. Sending data to mutations: updBlocks
            ctx.commit("updBlocks", data);
          }
        })
        .catch(error => {
          console.error("Error:", error);
        });
    },
    // will render block on pageload from mounted in stats
    async renderLastBlock(ctx) {
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
            console.log(data);
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
    }
  },
  modules: {}
});
