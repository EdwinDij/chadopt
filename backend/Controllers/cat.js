import { Cat } from "../Models/cat.js";
import { User } from "../Models/user.js";

export const createCat = async (req, res) => {
  const { name, birthday, description, sexe, city, race, status } = req.body;

  const picture = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : null;

  try {
    if (req.user.isAdmin) {
      const cat = await Cat.create({
        name,
        birthday,
        description,
        sexe,
        city,
        picture: picture,
        race,
        status,
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
      res.status(200).json({ message: "Cat deleted !", status: 200 });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "vous n'avez pas les droits d'admin", error });
  }
};

export const updateCat = async (req, res) => {
  const { name, birthday, description, sexe, city, picture, race, status } =
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
          status: status,
        },
        { where: { id: req.params.id } }
      )
        .then(() => {
          res.status(200).json({ message: "Cat updated !", status: 200 });
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
  const { userId, cancel } = req.body;

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (user) {
      const updateValues = {};

      if (cancel === "Adoptable") {
        updateValues.status = "Adoptable";
        updateValues.requestUserId = [];
      } else {
        updateValues.status = "demande en cours";
        updateValues.requestUserId = [user.id];
      }

      Cat.update(updateValues, { where: { id: req.params.id } })
        .then(() => {
          res.status(200).json({ message: "Cat updated !", status: 200 });
        })
        .catch((error) => {
          res.status(400).json({ error });
        });
    } else {
      res.status(400).json({ message: "Vous devez être connecté" });
    }
  } catch (error) {
    res.status(400).json({ error, message: "erreur" });
  }
};

export const getAdoptedCats = async (req, res) => {
  try {
    const cats = await Cat.findAll({ where: { status: true } });
    res.status(200).json(cats);
  } catch (error) {
    res.status(400).json({ error });
  }
};

// ...

export const addToFavorites = async (req, res) => {
  const { userId } = req.body;

  try {
    const cat = await Cat.findOne({ where: { id: req.params.id } });
    const user = await User.findOne({ where: { id: userId } });

    if (user && cat) {
      const isFavorite = cat.favoriteUserId.includes(user.id);

      if (isFavorite) {
        const updatedFavoriteUsers = cat.favoriteUserId.filter(
          (id) => id !== user.id
        );

        await Cat.update(
          { favoriteUserId: updatedFavoriteUsers },
          { where: { id: req.params.id } }
        );

        res.status(200).json({ message: "Cat removed from fav!", status: 200 });
        return;
      }

      const updatedFavoriteUsers = [...cat.favoriteUserId, user.id];

      await Cat.update(
        { favoriteUserId: updatedFavoriteUsers },
        { where: { id: req.params.id } }
      );

      res.status(200).json({ message: "Cat added to fav!", status: 200 });
      return;
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
