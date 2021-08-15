import Vue from "vue";
import Router from "vue-router";

import Index from "./views/index/index";
import Cookie from "./views/cookie";
import devTool from "./views/devtool";
import Tool from "./views/tool/index";
import WMIndex from "./views/wm/index";
import WsChat from "./views/wsChat/index";

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
      path: "/tool",
      component: Tool,
      name: "Tool",
      meta: {
        title: "工具"
      }
    },
    {
      path: "/devTool",
      component: devTool,
      name: "DevTool",
      meta: {
        title: "开发者工具"
      }
    },
    {
      path: "/wm",
      component: WMIndex,
      name: "WMIndex",
      meta: {
        title: "去水印"
      }
    },
    {
      path: "/chat",
      component: WsChat,
      name: "WsChat",
      meta: {
        title: "WEB IM"
      }
    }
  ]
});
