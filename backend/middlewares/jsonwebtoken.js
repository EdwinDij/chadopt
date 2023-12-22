import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const webToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;

    if (req.body.id && req.body.id !== userId) {
      throw "Invalid user ID or not Admin !";
    } else {
      next();
    }
    next();
  } catch (error) {
    res.status(401).json({
      error: error | "requête non authentifiée !",
    });
  }
};
