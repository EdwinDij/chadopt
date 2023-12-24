import express from "express";
import { getAllCats, getOneCat, createCat, deleteCat, updateCat, adoptCat,getAdoptedCats, addToFavorites} from "../Controllers/cat.js";
import { webToken } from "../middlewares/jsonwebtoken.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();

router.get("/", getAllCats);
router.get("/:id", getOneCat);
router.post("/", webToken, upload, createCat);
router.delete("/:id", webToken, deleteCat)
router.put("/:id", webToken, upload,updateCat)
router.put("/adopt/:id", webToken, adoptCat)
router.get("/adoptedCat", webToken, getAdoptedCats)
router.post("/addFavoriteCat/:id", webToken, addToFavorites)
export default router;
