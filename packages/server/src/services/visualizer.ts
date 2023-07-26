import ChildProcess from "child_process";
import path from "path"
import logger from "../logger";

export function startApp() {
    logger.info("Starting visualizer app on port 5000")
    return new Promise((resolve, reject) => {
        const process = ChildProcess.exec(`npx serve -p 5000 -s ${path.resolve(`visualizer`)} `, {}, (error, stdout, stderr) => {
            logger.info(stdout);
            logger.info(error);
            logger.info(stderr);
        });
        process.on("exit", (code) => {
            resolve(`Exited with code ${code}`)
        })
        process.on("message", logger.info);
        process.on("error", logger.error)
    })

}
