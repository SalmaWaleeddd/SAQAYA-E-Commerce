import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: () => import("../views/AboutView.vue"),
  },
  {
    path: "/404-error",
    component: () => import("../views/404View.vue"),
  },
  {
    path: "/contact",
    component: () => import("../views/ContactView.vue"),
  },
  {
  path: '/product/:id',
  name: 'ProductDetail',
  component: () => import('@/views/ProductDetailView.vue'),
  props: true
}
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
