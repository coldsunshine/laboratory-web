import Vue from "vue";
import Router from "vue-router";

import Index from "./views/index/index";
import Cookie from "./views/cookie";
import Tools from "./views/tools";

Vue.use(Router);

export default new Router({
  // mode: "history", // 去掉url中的#
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
        component: Index,
        name: "Index",
        meta: {
            title: "首页"
        }
    },
    {
      path: "/cookie",
      component: Cookie,
      name: "Cookie",
      meta: {
        title: "Cookie获取"
      }
    },
      {
          path: "/tools",
          component: Tools,
          name: "Tools",
          meta: {
              title: "工具"
          }
      }
  ]
});
