import express from "express";
import { getAllCats, getOneCat, createCat, deleteCat, updateCat } from "../Controllers/cat.js";
import { webToken } from "../middlewares/jsonwebtoken.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.get("/", getAllCats);
router.get("/:id", getOneCat);
router.post("/", webToken, upload.single("image"), createCat);
router.delete("/:id", webToken, deleteCat)
router.put("/:id", webToken, upload.single("image"),updateCat)

export default router;
