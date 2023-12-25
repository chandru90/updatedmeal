import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { userRouter } from "./routes/user.js";
import { recipesRouter } from "./routes/recipes.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://meal-mauve-omega.vercel.app",
    methods: "POST,GET,PUT",
    credentials: true
  })
);

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

const mongodbUri = process.env.CONNECTION_STRING;

if (!mongodbUri) {
  console.error("MongoDB URI is undefined. Check your .env file.");
} else {
  mongoose.connect( mongodbUri , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log("Connected to MongoDB successfully");
  }).catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
}

app.listen(3001, () => console.log("Server started"));