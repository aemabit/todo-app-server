import { Request, Response } from "express";
import ToDo, { IToDo } from "../models/ToDo";

export const todoList = async (req: Request, res: Response) => {
  const { payload } = req.body;

  try {
    const todoByUser = await ToDo.find({ user: payload });
    res.status(200).json(todoByUser);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const createTodo = async (req: Request, res: Response) => {
  const { payload, task } = req.body;

  try {
    const newTodo: IToDo = new ToDo({
      task,
      user: payload,
    });

    await newTodo.save();

    res.status(200).json(newTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  const { payload, id, input } = req.body;

  try {
    const updateTodo = await ToDo.findByIdAndUpdate(id, input, {
      new: true,
    });
    if (!updateTodo) throw new Error("Something was wrong, data not founded");

    res.status(200).json(updateTodo);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  const { payload, id } = req.body;

  try {
    const removeTodo = await ToDo.findByIdAndDelete(id);
    if (!removeTodo) throw new Error("Something was wrong, data not founded");

    const successMessage = "Task has been removed";
    res.status(200).json(successMessage);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
