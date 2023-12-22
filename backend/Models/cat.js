import { Sequelize, Model, DataTypes } from "sequelize";
import { sequelize } from "../config/database";
import { User } from "./user";

export const Cat = sequelize.define("cat", {
  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthday: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexe: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  picture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdopted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Cat.belongsTo(User);
User.hasMany(Cat);

User.belongsToMany(Cat, { through: "UserFavoriteCats" });
Cat.belongsToMany(User, { through: "UserFavoriteCats" });


Cat.sync({ alter: true })
  .then(() => {
    console.log("User table created");
  })
  .catch((error) => {
    console.error("Error creating User table:", error);
  });
