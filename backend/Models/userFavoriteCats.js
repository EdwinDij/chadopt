import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Cat } from "./cat";
import { User } from "./user";

export const UserFavoriteCats = sequelize.define("UserFavoriteCats", {
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  catId: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

User.belongsToMany(Cat, { through: UserFavoriteCats });
Cat.belongsToMany(User, { through: UserFavoriteCats });

UserFavoriteCats.sync({ alter: true })
  .then(() => {
    console.log("User table created");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });
