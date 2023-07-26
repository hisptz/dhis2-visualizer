import {Router} from "express";
import {getImage} from "../services/puppeteer";
import {config} from "dotenv";
import {sanitizeEnv} from "../utils/env";

config();
sanitizeEnv();
const router = Router()

const cacheTime = process.env.CACHE_TIME ?? '1 hour'


router.get("/", async (req, res) => {
    res.status(400).json({
        error: "Provide a visualization id"
    })
})
router.get("/:id", async (req, res) => {
    try {
        const params: { id: string } = req.params as any;
        const id = params.id as string;
        res.setHeader('x-cache-timeout', cacheTime)
        if (!id) {
            res.status(400).json({
                error: "Provide a visualization id"
            })
        }
        const image = await getImage(id)
        return res.json({
            image
        })
    } catch (e) {
        res.json(e);
        console.error(e)
    }
})


export default router;
