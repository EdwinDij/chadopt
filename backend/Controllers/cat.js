import { Cat } from "../Models/cat.js";
import { User } from "../Models/user.js";

export const createCat = async (req, res) => {
  const {
    name,
    birthday,
    description,
    sexe,
    city,
    picture,
    race,
    isAdopted,
    userId,
  } = req.body;

  Cat.create({
    name,
    birthday,
    description,
    sexe,
    city,
    picture,
    race,
    isAdopted,
  });
    res.status(201).json({ message: "Cat created" });
};

export const getAllCats = async (req, res) => {
  Cat.findAll()
    .then((cats) => {
      res.status(200).json(cats);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

export const getOneCat = async (req, res) => {
  Cat.findOne({ where: { id: req.params.id } })
    .then((cat) => {
      res.status(200).json(cat);
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};
