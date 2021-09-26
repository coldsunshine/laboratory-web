//根据不同的环境更改不同的baseUrl
export let baseUrl = "";
export let ipPort = "";

if (process.env.NODE_ENV == "development") {
  baseUrl = "/api";
  ipPort = "127.0.0.1:7880";
} else if (process.env.NODE_ENV == "production") {
  baseUrl = "http://159.75.42.178:1170";
  ipPort = "159.75.42.178:7880";
} else {
  baseUrl = "http://159.75.42.178:1170";
  ipPort = "159.75.42.178:7880";
}
