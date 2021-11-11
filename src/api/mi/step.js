import http from "@/utils/http";

export function miBrushStep(params) {
  return http.postJson("/free/mi/step", params);
}

export function miBrushStepTopN(params) {
  return http.get("/free/mi/step/latest", params);
}
