//根据不同的环境更改不同的baseUrl
export let baseUrl = "";
export let ipPort = "";

if (process.env.NODE_ENV == "development") {
  baseUrl = "/api";
  ipPort = "http://lab.yiidii.cn:7780";
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "http://lab.yiidii.cn:1170";
  ipPort = "http://lab.yiidii.cn:7780";
} else {
  ipPort = "http://lab.yiidii.cn:7780";
  baseUrl = "http://lab.yiidii.cn:1170";
}
