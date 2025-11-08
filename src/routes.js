import { Database } from "./database.js";
import { randomUUID } from 'node:crypto';

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (request, response) => {
            const users = database.select('users');
            const usersStringified = JSON.stringify(users);

            return response.writeHead(200).end(usersStringified);
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (request, response) => {
            if(request.body === null) return response.writeHead(400).end('Body não possui valor valido (name, email)');

            const name = request.body.name;
            const email = request.body.email;

            const user = ({
                id: randomUUID(),
                name,
                email
            });

            database.insert('users', user);

            return response.writeHead(201).end();
        }
    }
]