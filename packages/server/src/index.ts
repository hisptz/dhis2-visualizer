import express from "express";
import {config} from "dotenv";
import helmet from "helmet"
import {startApp} from "./services/visualizer";
import routes from "./routes";
import proxy from "./services/proxy";

config()
const port = process.env.PORT || 7000;
const apiMountPoint = process.env.API_MOUNT_POINT || "/api";
const proxyTarget = process.env.DHIS2_MEDIATOR_URL ?? "http://mediator:3000/api";
const proxyPort = 5001

const app = express();


app.use(express.json());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true
}))


app.use(`${apiMountPoint}/generate`, routes)

app.get(`${apiMountPoint}`, (req, res) => {
    res.send("Hello, Welcome to the DHIS2 image generator");
})

startApp().then(console.info);

app.listen(port, () => {
    console.info(`Server started at ${port}`)
    proxy.listen(proxyPort, () => {
        console.info(`Proxy to ${proxyTarget} started at ${proxyPort}`);
    })
})
