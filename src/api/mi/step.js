import http from "@/utils/http";

export function miBrushStep(params) {
  return http.get("/free/mi/step", params);
}
