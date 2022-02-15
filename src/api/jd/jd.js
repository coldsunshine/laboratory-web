/**** 京东 ****/
import http from "@/utils/http";

export function sendSms(mobile) {
  return http.get("/jd/smsCode?mobile=" + mobile);
}

export function login(params) {
  return http.postJson("/jd/login", params);
}

export function chromeSendSmsCode(params) {
  return http.get("/jd/chrome/sendSmsCode", params);
}

export function chromeLogin(sid, params) {
  return http.postJson("/jd/chrome/" + sid + "/login", params);
}
