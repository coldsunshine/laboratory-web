//根据不同的环境更改不同的baseUrl
let baseUrl = "";

if (process.env.NODE_ENV == "development") {
  baseUrl = "/api";
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "http://lab.yiidii.cn:1170";
} else {
  baseUrl = "http://lab.yiidii.cn:1170";
}

export {
  baseUrl //导出baseUrl
};
