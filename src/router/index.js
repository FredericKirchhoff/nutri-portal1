import Vue from "vue";
import VueRouter from "vue-router";
import Routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: Routes,
  mode: "history",
  base: process.env.BASE_URL
});

export default router;
