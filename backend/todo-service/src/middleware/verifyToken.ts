import { Request, Response, NextFunction } from 'express';

export const verifyTokenMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    const jwtToken = req.headers.authorization || "";
    const todosAPIKey = process.env.TODOS_API_KEY;
    if (!todosAPIKey) {
        return res.status(401).json({ error: 'todos API key not provided' });
    }

    if (!jwtToken) {
        return res.status(401).json({ error: 'session token not provided' });
    }

    try {
        const response = await fetch(`http://localhost:4001/private/session`, {
            headers: {
                'Authorization': jwtToken,
                'TODOS-API-KEY': todosAPIKey
            }
        });

        if (!response.ok) {
            throw new Error(`Error verifying the token: ${response.status}`);
        }

        const responseBody = await response.json();

        if (!responseBody.userId) {
            throw new Error('Incorrect token payload');
        }

        req.user = responseBody.userId;

        next();
    } catch (error) {
        console.log(error)
        return res.status(401).json({ error: 'Can\'t authenticate with "todos" service' });
    }
};
