import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../Models/user.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: "Please fill all fields" });
  }

  if (password.length > 8) {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const signupUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      User.create(signupUser)
        .then(() => {
          res.status(201).json({
            message: "User created !",
            creadentials: {
              email: signupUser.email,
              username: signupUser.username,
            },
          });
        })
        .catch((error) => {
          res.status(400).json({
            message: error,
          });
        });
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "User not found !" });
      }
      bcrypt
        .compare(password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Incorrect password !" });
          }
          res.status(200).json({
            userId: user.id,
            username: user.username,
            isAdmin: user.isAdmin,
            token: jwt.sign(
              { userId: user.id, isAdmin: user.isAdmin },
              process.env.JWT_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => {
          res.status(500).json({ error });
        });
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
