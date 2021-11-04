import http from "@/utils/http";

export function videoParse() {
  return http.get("/free/dict?type=VIDEO_PARSE");
}
