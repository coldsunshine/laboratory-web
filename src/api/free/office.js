import http from "@/utils/http";

export function toPdf(params) {
  return http.postForm("/free/doc/2pdf", params);
}

export function get2pdfTaskList(params) {
  return http.postJson("/free/doc/2pdf/task/list", params);
}

export function ocr(params) {
  return http.postForm("/free/doc/ocr", params);
}

export function getOCRTaskList(params) {
  return http.postJson("/free/doc/ocr/task/list", params);
}
