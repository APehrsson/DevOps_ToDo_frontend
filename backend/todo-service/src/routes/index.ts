import { Router } from "express"
import { getTodos, addTodo, updateTodo, deleteTodo } from "../controllers/todos"
import { verifyTokenMiddleware } from "../middleware/verifyToken"

const router: Router = Router()

router.get("/todos", verifyTokenMiddleware, getTodos)

router.post("/add-todo", verifyTokenMiddleware, addTodo)

router.put("/edit-todo/:id", verifyTokenMiddleware, updateTodo)

router.delete("/delete-todo/:id", verifyTokenMiddleware, deleteTodo)

export default router