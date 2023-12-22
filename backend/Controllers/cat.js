import { Cat } from "../Models/cat.js";
import { User } from "../Models/user.js";

export const createCat = async (req, res) => {
  const { name, birthday, description, sexe, city, picture, race, isAdopted } =
    req.body;

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

export const updateCat = async (req, res) => {
  const { name, birthday, description, sexe, city, picture, race, isAdopted } =
    req.body;
  try {
    if (req.user.isAdmin) {
      Cat.update(
        {
          name: name,
          birthday: birthday,
          description: description,
          sexe: sexe,
          city: city,
          picture: picture,
          race: race,
          isAdopted: isAdopted,
        },
        { where: { id: req.params.id } }
      )
        .then(() => {
          res.status(200).json({ message: "Cat updated !" });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "vous n'avez pas les droits d'admin", error });
  }
};

export const adoptCat = async (req, res) => {
  try {
    const cat = await Cat.findOne({ where: { id: req.params.id } });
    const user = await User.findOne({ where: { id: req.user.id } });
    if (req.user) {
      Cat.update(
        {
          isAdopted: true,
          adoptedUserId: user.id,
        },
        { where: { id: cat.id } }
      );
    } else {
      res.status(400).json({ message: "Vous devez être connecté" });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
