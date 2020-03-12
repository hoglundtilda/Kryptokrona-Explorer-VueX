import Vue from "vue";
import VueRouter from "vue-router";
import Explorer from "../views/Explorer.vue";
import CheckTXN from "../views/CheckTXN.vue";

Vue.use(VueRouter);

const routes = [
  {
    //default page
    path: "/",
    name: "Explorer",
    component: Explorer
  },
  {
    path: "/check_txn",
    name: "CheckTXN",
    component: CheckTXN
  }
];

const router = new VueRouter({
  routes
});

export default router;
