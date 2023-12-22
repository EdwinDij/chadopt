import express from "express";
import cors from "cors";
import helmet from "helmet";
import { config } from "dotenv";
config();

import { sequelize } from "../config/database.js";
import  userRoutes  from "../Routes/user.js";
import  catRoutes  from "../Routes/cat.js";

const app = express();
const PORT = process.env.PORT || 5000;

//middleware de sécurité
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/", (req, res) => {
  res.send("Hello from server!");
});

//connection à la base de données
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.listen(
  PORT,
  console.log(`Server running on port: http://localhost:${PORT}`)
);

//routes

app.use("/auth/user", userRoutes);
app.use("/cat", catRoutes);

export default app;