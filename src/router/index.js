import Vue from "vue";
import VueRouter from "vue-router";
import Explorer from "../views/Explorer.vue";
import SearchResult from "../views/SearchResult.vue";
import Outputs from "../views/Outputs.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Explorer",
    component: Explorer
  },
  {
    path: "/result",
    name: "SearchResult",
    component: SearchResult
  },
  {
    path: "/blockchain_transaction",
    name: "Transactions",
    component: Outputs
  },
];

const router = new VueRouter({
  routes
});

export default router;
