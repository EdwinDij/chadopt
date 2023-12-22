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

  try {
    if (req.user.isAdmin) {
      const cat = await Cat.create({
        name,
        birthday,
        description,
        sexe,
        city,
        picture,
        race,
        isAdopted,
      });

      res.status(201).json({ message: "Cat created", cat });
    } else {
      res
        .status(403)
        .json({ message: "You are not authorized to create a cat" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
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

export const deleteCat = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await Cat.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Cat deleted !" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "vous n'avez pas les droits d'admin", error });
  }
};
