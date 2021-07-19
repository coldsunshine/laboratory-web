/**** 京东 ****/
import http from "@/utils/http";

export function qrCode() {
  return http.get("/jd/qrCode");
}

export function check(params) {
  return http.postJson("/jd/check", params);
}
