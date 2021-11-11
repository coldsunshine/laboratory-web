import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
//封装element notify, message
import notify from "./utils/notify.js";
import message from "./utils/message.js";
// echarts
import * as echarts from "echarts";
import "./index.css";
import "tailwindcss/tailwind.css";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
import ElementComponent from "element-component";

Vue.config.productionTip = false;
//element
Vue.use(ElementUI);
//封装element notify, message
Vue.prototype.$notify = notify;
Vue.prototype.$message = message;
// echarts
Vue.prototype.$echarts = echarts;

Vue.use(VideoPlayer);
Vue.use(ElementComponent);

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
