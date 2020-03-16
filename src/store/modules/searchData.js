const searchData = {
  state: {
    api: "http://explorer.kryptokrona.se:11898",
    searchData: ""
  },
  mutations: {
    blockByHeight(state, data) {
      state.searchData = data.result.block_header;
    },
    blockByHash_or_id(state, data) {
      state.searchData = data.result.block;
    }
  },
  actions: {
    getBlockByHash_or_id(ctx, hash) {
      const url = this.state.getSearchData.api + "/json_rpc";
      console.log(url);
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
            ctx.commit("blockByHash_or_id", data);
          }
        });
    },

    // ---------------------------------
    getBlockByHeight(ctx, height) {
      const url = this.state.getSearchData.api + "/json_rpc";
      console.log(url);
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
            ctx.commit("block", data);
          }
        });
    }
  }
};
export default searchData;
