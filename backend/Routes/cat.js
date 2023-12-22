import express from "express";
import { getAllCats, getOneCat, createCat } from "../Controllers/cat.js";
import { webToken } from "../middlewares/jsonwebtoken.js";
const router = express.Router();

router.get("/", getAllCats);
router.get("/:id", getOneCat);
router.post("/", webToken, createCat);

export default router;
