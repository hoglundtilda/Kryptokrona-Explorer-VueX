import Vue from 'vue';
import Vuex from 'vuex';
import blocksData from './modules/getBlocksData';
import poolTransactions from './modules/poolTransactions';
import searchData from './modules/searchData';
import outputs from './modules/getOutputs';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    api: 'https://cors-anywhere.herokuapp.com/https://explorer.kryptokrona.se/api',
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
