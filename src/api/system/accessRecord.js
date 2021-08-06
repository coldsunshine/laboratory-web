import http from "@/utils/http";

export function addOne(params) {
  return http.postJson("/accessRecord", params);
}

export function statistics(params) {
  return http.get("/accessRecord/statistics", params);
}

export function accessTrend() {
  return http.get("/accessRecord/trend");
}

export function overview(params) {
  return http.get("/accessRecord/overview", params);
}
