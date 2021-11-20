import Vue from "vue";
import Router from "vue-router";

import Index from "./views/index/index";
import Cookie from "./views/cookie";
import devTool from "./views/devtool";
import Tool from "./views/tool/index";
import WMIndex from "./views/wm/index";
import WsChat from "./views/wsChat/index";
import MiStep from "./views/mi/step";
import VideoParse from "./views/free/videoparse/index";
import OfficeIndex from "./views/office/index";

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
      path: "/mi/step",
      component: MiStep,
      name: "MiStep",
      meta: {
        title: "刷运动步数"
      }
    },
    {
      path: "/chat",
      component: WsChat,
      name: "WsChat",
      meta: {
        title: "WEB IM"
      }
    },
    {
      path: "/video-parse",
      component: VideoParse,
      name: "VideoParse",
      meta: {
        title: "视频解析"
      }
    },
    {
      path: "/office",
      component: OfficeIndex,
      name: "OfficeIndex",
      meta: {
        title: "办公工具"
      }
    }
  ]
});
