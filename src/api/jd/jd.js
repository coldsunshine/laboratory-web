/**** 京东 ****/
import http from "@/utils/http";

export function qrCode() {
  return http.get("/jd/qrCode");
}

export function check(params) {
  return http.postJson("/jd/check", params);
}

export function chromeSendSmsCode(params) {
  return http.get("/jd/chrome/sendSmsCode", params);
}

export function chromeLogin(sid, params) {
  return http.postJson("/jd/chrome/" + sid + "/login", params);
}
