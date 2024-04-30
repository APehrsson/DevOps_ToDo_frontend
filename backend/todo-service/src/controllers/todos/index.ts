import { Response, Request, NextFunction } from "express"
import { ITodo } from "../../types/todo"
import Todo from "../../models/todo"

const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;
    const todos: ITodo[] = await Todo.find({ createdBy: userId })
    res.status(200).json({ todos })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error getting the todos" })
  }
}

const addTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    const body = req.body as Pick<ITodo, "name" | "description" | "status">

    const todo: ITodo = new Todo({
      name: body.name,
      description: body.description,
      status: body.status,
      createdBy: userId
    })

    const newTodo: ITodo = await todo.save()
    const allTodos: ITodo[] = await Todo.find({ createdBy: userId })

    res
      .status(201)
      .json({ message: "Todo added", todo: newTodo, todos: allTodos })
  } catch (error) {
    console.log(error)
    res
      .status(400)
      .json({ message: "Error adding the todo" })
  }
}

const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    const {
      params: { id },
      body,
    } = req

    const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
      { _id: id },
      body
    )

    const allTodos: ITodo[] = await Todo.find({ createdBy: userId })

    res.status(200).json({
      message: "Todo updated",
      todo: updateTodo,
      todos: allTodos,
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating the todo" })
  }
}

const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.user;

    const deletedTodo: ITodo | null = await Todo.findByIdAndDelete(
      req.params.id
    )

    const allTodos: ITodo[] = await Todo.find({ createdBy: userId })

    res.status(200).json({
      message: "Todo deleted",
      todo: deletedTodo,
      todos: allTodos,
    })
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error deleting the todo" })
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }