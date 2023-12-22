import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split(".").pop();
    callback(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  // Vérifie le type MIME du fichier
  if (file.mimetype.startsWith("image/")) {
    callback(null, true); // Accepte le fichier
  } else {
    callback(new Error("Invalid file type. Only images are allowed."), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export { upload };