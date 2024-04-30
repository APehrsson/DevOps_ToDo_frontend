const baseUrl: string = 'http://localhost:4000'

const getHeaders = (): HeadersInit => {
    const token = localStorage.getItem('token') ?? "";

    return {
        'Content-Type': 'application/json',
        'Authorization': token,
    };
}

export const getTodos = async (): Promise<ApiDataType> => {
    try {
        const response = await fetch(baseUrl + '/todos', {
            method: 'GET',
            headers: getHeaders(),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch todos');
        }
        const data: ApiDataType = await response.json();
        console.log(data)
        return data;
    } catch (error) {
        throw new Error(error);
    }
}


export const addTodo = async (formData: ITodo): Promise<ApiDataType> => {
    try {
        const todo: Omit<ITodo, '_id'> = {
            name: formData.name,
            description: formData.description,
            status: false,
        };

        const response = await fetch(baseUrl + '/add-todo', {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(todo),
        });

        if (!response.ok) {
            throw new Error('Failed to add todo');
        }

        const data: ApiDataType = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};


export const updateTodo = async (todo: ITodo): Promise<ApiDataType> => {
    try {
        const todoUpdate: Pick<ITodo, 'status'> = {
            status: true,
        };

        const response = await fetch(`${baseUrl}/edit-todo/${todo._id}`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(todoUpdate),
        });

        if (!response.ok) {
            throw new Error('Failed to update todo');
        }

        const data: ApiDataType = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};


export const deleteTodo = async (_id: string): Promise<ApiDataType> => {
    try {
        const response = await fetch(`${baseUrl}/delete-todo/${_id}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to delete todo');
        }

        const data: ApiDataType = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};
