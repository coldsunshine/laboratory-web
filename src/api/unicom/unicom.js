/**** 联通 ****/
import http from "@/utils/http";

export function sendRandomNum(params) {
  return http.postJson("/telecom/sendRandomNum", params);
}

export function randomLogin(params) {
  return http.postJson("/telecom/randomLogin", params);
}
