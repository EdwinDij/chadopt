import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";

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

UserFavoriteCats.sync().then(() => {
  console.log("UserFavoriteCats table created");
});
