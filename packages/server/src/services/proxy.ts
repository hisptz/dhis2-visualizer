import {config} from "dotenv";

const httpProxy = require("http-proxy");
config()
const target = process.env.DHIS2_MEDIATOR_URL ?? "http://mediator:3000/api";

const proxy = httpProxy.createProxyServer({

    target: target,
    changeOrigin: true,
    secure: false,
    protocolRewrite: "http",
    cookieDomainRewrite: "",
    cookiePathRewrite: "/",
});

export default proxy;

