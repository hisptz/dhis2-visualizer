import {Router} from "express";
import {getImage} from "../services/puppeteer";


const router = Router()


router.get("/", async (req, res) => {
    res.status(400).json({
        error: "Provide a visualization id"
    })
})
router.get("/:id", async (req, res) => {
    try {
        const params: { id: string } = req.params as any;
        const id = params.id as string;
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
        res.json(e)
    }
})


export default router;
