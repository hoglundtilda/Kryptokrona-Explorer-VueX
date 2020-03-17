const searchData = {
  state: {
    api: "http://explorer.kryptokrona.se:11898",
    searchData: "",
    blockTransactions: ""
  },
  mutations: {
    blockByHeight(state, data) {
      console.log(data)
      state.searchData = data.result.block_header;
    },
    blockByHash_or_id(state, data) {
      state.searchData = data.result.block;
    },
    blockTransaction(state, data) {
      state.blockTransactions = data;
    }
  },
  actions: {
    getBlockByHash_or_id(ctx, hash) {
      const url = this.state.getSearchData.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "GetSearchBlock",
          method: "f_block_json",
          params: {
            hash: hash
          }
        }),
        dataType: "json"
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log(data)
            ctx.commit("blockByHash_or_id", data);
          }
        });
    },

    // ---------------------------------
    getBlockByHeight(ctx, height) {
      const url = this.state.getSearchData.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "blockbyheight",
          method: "getblockheaderbyheight",
          params: {
            height: parseInt(height)
          }
        }),
        dataType: "json"
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            console.log(data)
            this.dispatch("getBlockByHash_or_id", data.result.block_header.hash)
          }
        });
    },
    // ---------------------------------
    getBlockTransaction(ctx, hash) {
      const url = this.state.getSearchData.api + "/json_rpc";
      fetch(url, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          id: "test",
          method: "f_transaction_json",
          params: {
            hash: hash
          }
        }),
        dataType: "json"
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            ctx.commit("blockTransaction", data);
          }
        });
    }
  }
};
export default searchData;
