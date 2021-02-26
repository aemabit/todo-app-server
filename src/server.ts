import express, { Application } from "express";
import cors from "cors";

import userRoutes from "./routes/auth"
import todoRoutes from "./routes/todo"


const app: Application = express();

// SETTINGS
app.set("port", process.env.PORT || 4000);

// MIDDLEWARE
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors({ origin: "https://aemabit-todo-app.herokuapp.com/", credentials: true }));

// ROUTES
app.use("/api/auth", userRoutes)
app.use("/api/todo", todoRoutes)

export default app