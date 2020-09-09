import Vue from 'vue';
import Vuex from 'vuex';

import blocksData from './modules/getBlocksData';
import poolTransactions from './modules/poolTransactions';
import searchData from './modules/searchData';
import outputs from './modules/getOutputs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: 'https://explorer.kryptokrona.se:11898',
  },
  mutations: {},

  actions: {},
  modules: {
    getBlocksData: blocksData,
    getPoolTransactions: poolTransactions,
    getSearchData: searchData,
    getOutputs: outputs,
  },
});
