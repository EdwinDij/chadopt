import jwt from "jsonwebtoken";
import { config } from "dotenv";
config();

export const webToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const isAdmin = decodedToken.isAdmin;
    

    if (req.body.id && req.body.id !== userId) {
      throw "Invalid user ID or not Admin!";
    } else if (!isAdmin) {
      throw "User is not an admin!";
    } else {
      req.user = { id: userId, isAdmin: isAdmin };
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error || "Requête non authentifiée!",
    });
  }
};
