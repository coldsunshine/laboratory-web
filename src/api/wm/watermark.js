import http from "@/utils/http";

export function rmDouYinWaterMark(params) {
  return http.postJson("/wm", params);
}
