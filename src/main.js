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

Vue.config.productionTip = false;
//element
Vue.use(ElementUI);
//封装element notify, message
Vue.prototype.$notify = notify;
Vue.prototype.$message = message;
// echarts
Vue.prototype.$echarts = echarts;

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
