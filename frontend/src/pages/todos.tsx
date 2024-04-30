import React, { useEffect, useState } from 'react'
import TodoItem from '../components/TodoItem'
import AddTodo from '../components/AddTodo'
import { getTodos, addTodo, updateTodo, deleteTodo } from '../API'
import { useNavigate } from 'react-router-dom'

const sortTodos = (todos: ITodo[]): ITodo[] => {
    todos.sort((a, b) => {
        if (a.status && !b.status) {
            return 1;
        } else if (!a.status && b.status) {
            return -1;
        } else {
            return 0;
        }
    })
    return todos
}

const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>([])
    const [username] = useState<string>(localStorage.getItem("username") as string)
    const navigate = useNavigate();

    useEffect(() => {
        fetchTodos()
    }, [])

    const fetchTodos = (): void => {
        getTodos()
            .then(({ todos }: ITodo[] | any) => setTodos(sortTodos(todos))
            )
            .catch((err: Error) => console.log(err))
    }

    const handleSaveTodo = (e: React.FormEvent, formData: ITodo): void => {
        e.preventDefault()
        console.log(formData)
        addTodo(formData)
            .then((data) => {
                setTodos(sortTodos(data.todos))
            })
            .catch((err) => console.log(err))
    }

    const handleUpdateTodo = (todo: ITodo): void => {
        updateTodo(todo)
            .then((data) => {
                setTodos(sortTodos(data.todos))
            })
            .catch((err) => console.log(err))
    }

    const handleDeleteTodo = (_id: string): void => {
        deleteTodo(_id)
            .then((data) => {
                setTodos(sortTodos(data.todos))
            })
            .catch((err) => console.log(err))
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/auth');
    };

    return (
        <main className='App'>
            <h1>My Todos</h1>
            <p>Logged in as: {username}</p>
            <button onClick={handleLogout}>Logout</button>
            <AddTodo saveTodo={handleSaveTodo} />
            {todos.map((todo: ITodo) => (
                <TodoItem
                    key={todo._id}
                    updateTodo={handleUpdateTodo}
                    deleteTodo={handleDeleteTodo}
                    todo={todo}
                />
            ))}
        </main>
    )
}

export default TodosPage