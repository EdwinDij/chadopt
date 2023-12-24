import multer from "multer";

const MYME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MYME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

export const upload = multer({ storage: storage }).single("picture");
