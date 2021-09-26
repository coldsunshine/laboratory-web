//根据不同的环境更改不同的baseUrl
export let baseUrl = "/api";
export let ipPort;

if (process.env.NODE_ENV == "development") {
  ipPort = "127.0.0.1:7880";
} else if (process.env.NODE_ENV == "production") {
  ipPort = "159.75.42.178:7880";
} else {
  ipPort = "159.75.42.178:7880";
}
