/****   request.js   ****/
//引入baseUrl
import { baseUrl } from "../../config/env";
// 导入axios
import axios from "axios";
// 使用element-ui Message做消息提醒
import Message from "@/utils/message.js";
import randomStr from "@/utils/digital.js";

//1. 创建新的axios实例，
const service = axios.create({
  // 公共接口--这里注意后面会讲
  baseURL: baseUrl,
  // 超时时间 单位是ms，这里设置了30s的超时时间
  timeout: 60 * 1000
});
// 2.请求拦截器
service.interceptors.request.use(
  config => {
    //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等
    let token = localStorage.getItem("Token"); //注意使用的时候需要引入cookie方法，推荐js - cookie
    if (token) {
      config.headers["Token"] = token;
    }
    config.headers["pigeon-trace-id"] = randomStr(32);
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 3.响应拦截器
service.interceptors.response.use(
  response => {
    //接收到响应数据并成功后的一些共有的处理，关闭loading等
    const data = response.data;
    let msg = data.msg;
    let ignoreCodeList = [0, 21, 176, 258];
    if (Boolean(ignoreCodeList.indexOf(data.code) == -1) && Boolean(msg)) {
      Message.error(msg);
      return;
    }
    return response.data;
  },
  error => {
    let data = error.response.data;
    let msg = data.msg;
    Message.error(msg);
    return Promise.resolve(error);
  }
);
//4.导入文件
export default service;
