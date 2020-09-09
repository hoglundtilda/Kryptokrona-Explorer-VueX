const poolTransactions = {
  state: {
    poolTransactions: '',
  },
  mutations: {
    poolTransactions(state, data) {
      state.poolTransactions = data.result.transactions;
    },
  },
  actions: {
    getPoolTransactions(ctx) {
      const url = this.state.api + '/json_rpc';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'test',
          method: 'f_on_transactions_pool_json',
          params: {},
        }),
        dataType: 'text',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ctx.commit('poolTransactions', data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};

export default poolTransactions;
