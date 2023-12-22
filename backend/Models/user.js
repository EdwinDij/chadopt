import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { Cat } from "./cat";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  favoriteCats: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
    allowNull: true,
  },
});

User.belongsToMany(Cat, { through: "UserFavoriteCats" });

User.sync().then(() => {
  console.log("User table created");
});
