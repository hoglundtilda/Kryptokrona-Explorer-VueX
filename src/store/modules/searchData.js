const searchData = {
  state: {
    searchData: '',
    blockTransactions: '',
  },
  mutations: {
    blockByHash_or_id(state, data) {
      state.searchData = data.result.block;
      localStorage.setItem('block', JSON.stringify(state.searchData));
    },
    blockTransaction(state, data) {
      state.blockTransactions = data;
    },
  },
  actions: {
    getBlockByHash_or_id(ctx, hash) {
      const url = this.state.api + '/json_rpc';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'GetSearchBlock',
          method: 'f_block_json',
          params: {
            hash: hash,
          },
        }),
        dataType: 'json',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ctx.commit('blockByHash_or_id', data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },

    // ---------------------------------
    getBlockByHeight(ctx, height) {
      const url = this.state.api + '/json_rpc';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'blockbyheight',
          method: 'getblockheaderbyheight',
          mode: "no-cors",
          params: {
            height: parseInt(height),
          },
        }),
        dataType: 'json',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            this.dispatch(
              'getBlockByHash_or_id',
              data.result.block_header.hash
            );
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    // ---------------------------------
    getBlockTransaction(ctx, hash) {
      const url = this.state.api + '/json_rpc';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'test',
          method: 'f_transaction_json',
          mode: "no-cors",
          params: {
            hash: hash,
          },
        }),
        dataType: 'json',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ctx.commit('blockTransaction', data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
export default searchData;
