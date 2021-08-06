import http from "@/utils/http";

export function addOne(params) {
  return http.postForm("/accessRecord", params);
}

export function statistics(params) {
  return http.get("/accessRecord/statistics", params);
}

export function accessTrend() {
  return http.get("/accessRecord/trend");
}

export function overview() {
  return http.get("/accessRecord/overview");
}
