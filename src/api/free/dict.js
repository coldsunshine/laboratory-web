import http from "@/utils/http";

export function getList(type) {
  return http.get("/dict?type=" + type);
}

export function save(params) {
  return http.postJson("/dict", params);
}
