import Vue from "vue";
import Vuex from "vuex";

import blocksData from "./modules/getBlocksData";
import poolTransactions from "./modules/poolTransactions";
import searchData from "./modules/searchData";
import checkTXN from "./modules/checkTXN";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nav: false
  },
  mutations: {},

  actions: {},
  modules: {
    getBlocksData: blocksData,
    getPoolTransactions: poolTransactions,
    getSearchData: searchData,
    getTXNData: checkTXN
  }
});
