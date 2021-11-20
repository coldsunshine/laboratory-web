import http from "@/utils/http";

export function toPdf(params) {
  return http.postForm("/free/doc/2pdf", params);
}

export function get2pdfFileList(params) {
  return http.postJson("/free/doc/2pdf/file/list", params);
}
