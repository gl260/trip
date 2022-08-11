import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      component: () => import("@/views/home/home.vue"),
    },
    {
      path: "/login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        currentShow: true,
      },
    },
    {
      path: "/favor",
      component: () => import("@/views/favor/favor.vue"),
    },
    {
      path: "/order",
      component: () => import("@/views/order/order.vue"),
    },
    {
      path: "/message",
      component: () => import("@/views/message/message.vue"),
    },
    {
      path: "/city",
      component: () => import("@/views/city/city.vue"),
      meta: {
        currentShow: true, //其它路由currentShow没有设置,为undefined,转为布尔类型是false
      },
    },
    {
      path: "/search",
      component: () => import("@/views/search/search.vue"),
      meta: {
        currentShow: true,
      },
    },
    {
      path: "/searchfor",
      component: () => import("@/views/searchfor/searchfor.vue"),
      meta: {
        currentShow: true,
      },
    },
    {
      path: "/detail/:id",
      component: () => import("@/views/detail/detail.vue"),
    },
  ],
});

export default router;
