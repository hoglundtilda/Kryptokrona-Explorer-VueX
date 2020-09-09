const blocksData = {
  state: {
    api: 'https://explorer.kryptokrona.se:11898',
    recentBlocks: '',
    alreadyGeneratedCoins: '',
    baseReward: '',
    height: '',
    transactions: '',
    difficulty: '',
  },
  mutations: {
    updBlocks(state, data) {
      state.recentBlocks = data.result.blocks;
    },
    clearState(state) {
      // Because computed has its own chache, state needs to be wiped out to show stats when switching views.
      state.alreadyGeneratedCoins = 0;
      state.baseReward = 0;
      state.height = 0;
      state.transactions = 0;
      state.difficulty = 0;
    },
    updStats(state, data) {
      state.alreadyGeneratedCoins = data.result.block.alreadyGeneratedCoins;
      state.baseReward = data.result.block.baseReward;
    },
    liveStats(state, data) {
      state.height = data.height;
      localStorage.setItem('lastHeight', JSON.stringify(data.height));
      state.transactions = data.tx_count;
      state.difficulty = data.difficulty;
    },
  },
  actions: {
    async getRecentBlocks(ctx, height) {
      const currHeight = height;
      const url = this.state.getBlocksData.api + '/json_rpc';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'test',
          method: 'f_blocks_list_json',
          params: {
            height: currHeight,
          },
        }),
        dataType: 'json',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ctx.commit('updBlocks', data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    async getLastBlock(ctx) {
      const url = this.state.getBlocksData.api + '/json_rpc';
      fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 'test',
          method: 'getlastblockheader',
          params: {},
        }),
        dataType: 'json',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            const lastBlockHash = data.result.block_header.hash;
            const url = this.state.getBlocksData.api + '/json_rpc';
            fetch(url, {
              method: 'POST',
              body: JSON.stringify({
                jsonrpc: '2.0',
                id: 'test',
                method: 'f_block_json',
                params: {
                  hash: lastBlockHash,
                },
              }),
              dataType: 'json',
            })
              .then((response) => response.json())
              .then((data) => {
                if (data) {
                  ctx.commit('updStats', data);
                }
              });
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    // --------------------------------------------------

    fetchLiveStats(ctx) {
      ctx.commit('clearState');

      const url = this.state.getBlocksData.api + '/getinfo';
      fetch(url, {
        method: 'GET',
        dataType: 'json',
      })
        .then((response) => response.json())
        .then((data) => {
          if (data) {
            ctx.commit('liveStats', data);
            const height = data.height - 1;
            this.dispatch('getRecentBlocks', height);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
  },
};
export default blocksData;
