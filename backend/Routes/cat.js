import express from "express";
import { getAllCats, getOneCat, createCat } from "../Controllers/cat.js";

const router = express.Router();

router.get("/", getAllCats);
router.get("/:id", getOneCat);
router.post("/", createCat);

export default router;
