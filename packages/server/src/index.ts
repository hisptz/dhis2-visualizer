import express from "express";
import {config} from "dotenv";
import helmet from "helmet"
import {startApp} from "./services/visualizer";
import routes from "./routes";

config()
const port = process.env.PORT || 7000;
const apiMountPoint = process.env.API_MOUNT_POINT || "/api";
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
})
