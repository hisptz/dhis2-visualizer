import express from "express";
import {config} from "dotenv";
import helmet from "helmet"
import {startApp} from "./services/visualizer";
import routes from "./routes";
import logger from "./logger";
import cacheMiddleware from "http-cache-middleware";
import proxy from "./services/proxy";
import compression from "compression";
import RateLimit from "express-rate-limit"


config()
const port = process.env.PORT || 7000;
const apiMountPoint = process.env.API_MOUNT_POINT || "/api";
const proxyTarget = process.env.DHIS2_MEDIATOR_URL ?? "http://mediator:3000/api";
const proxyPort = 5001

const app = express();

app.use(express.json());
// app.use(audit())
app.use(helmet.contentSecurityPolicy({
    useDefaults: true
}))
const limiter = RateLimit({
    windowMs: 60 * 1000,
    max: 100
})
app.use(limiter);
app.use(cacheMiddleware())
app.use(compression())


app.use(`${apiMountPoint}/generate`, routes)

app.delete(`${apiMountPoint}/cache`, (req, res) => {
    res.setHeader('x-cache-expire', `*`)
    res.end();
})

app.get(`${apiMountPoint}`, (req, res) => {
    res.send("Hello, Welcome to the DHIS2 image generator");
})

startApp().then(logger.info);
app.listen(port, () => {
    logger.info(`Server started at ${port}`)
    proxy.listen(proxyPort, () => {
        logger.info(`Proxy to ${proxyTarget} started at ${proxyPort}`);
    })
})
