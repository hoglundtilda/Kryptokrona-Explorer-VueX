import Vue from "vue";
import VueRouter from "vue-router";
import Explorer from "../views/Explorer.vue";
import CheckTXN from "../views/CheckTXN.vue";
import SearchResult from "../views/searchResult.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Explorer",
    component: Explorer
  },
  {
    path: "/check_txn",
    name: "CheckTXN",
    component: CheckTXN
  },
  {
    path: "/result",
    name: "SearchResult",
    component: SearchResult
  }
];

const router = new VueRouter({
  routes
});

export default router;
