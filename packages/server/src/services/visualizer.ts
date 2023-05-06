import ChildProcess from "child_process";

export function startApp() {
    console.log("Starting app...")
    return new Promise((resolve, reject) => {
        const process = ChildProcess.exec(`npx serve -s ../visualizer/dist -p 5000`, {}, (error, stdout, stderr) => {
            console.info(stdout);
            console.info(error);
            console.info(stderr);
        });
        process.on("exit", (code) => {
            resolve(`Exited with code ${code}`)
        })
        process.on("message", console.info);
        process.on("error", console.error)
    })

}
