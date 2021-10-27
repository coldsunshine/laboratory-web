import http from "@/utils/http";

export function miBrushStep(params) {
  return http.postJson("/free/mi/step", params);
}
