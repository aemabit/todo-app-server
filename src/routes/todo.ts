import { Router } from "express";
const router: Router = Router();

import { TokenValidation } from "../middlewares/verifyToken";
import { todoList, createTodo, deleteTodo, updateTodo } from "../controllers/todo.controller";

router.get("/list", TokenValidation, todoList)

router.post("/create", TokenValidation, createTodo);
router.post("/update", TokenValidation, updateTodo);
router.post("/delete", TokenValidation, deleteTodo);

export default router;
