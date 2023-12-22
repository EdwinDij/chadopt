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
          res.status(201).json({ message: "User created !" });
        })
        .catch((error) => {
          res.status(400).json({ message: error });
        });
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
};
