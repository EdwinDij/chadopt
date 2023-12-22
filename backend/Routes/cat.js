import express from "express";
import { getAllCats, getOneCat, createCat, deleteCat, updateCat } from "../Controllers/cat.js";
import { webToken } from "../middlewares/jsonwebtoken.js";
const router = express.Router();

router.get("/", getAllCats);
router.get("/:id", getOneCat);
router.post("/", webToken, createCat);
router.delete("/:id", webToken, deleteCat)
router.put("/:id", webToken, updateCat)

export default router;
