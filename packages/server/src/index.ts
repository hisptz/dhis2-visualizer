import express from "express";
import {config} from "dotenv";
import helmet from "helmet"
import {startApp} from "./services";

config()
const port = process.env.PORT || 6000;
const apiMountPoint = process.env.API_MOUNT_POINT || "/api";
const app = express();


app.use(express.json());
app.use(helmet.contentSecurityPolicy({
    useDefaults: true
}))


app.get("/")

startApp().then(console.info);

app.listen(port, () => {
    console.info(`Server started at ${port}`)
})
