import http from 'node:http';
import { randomUUID } from 'node:crypto';
import { json } from './middlewares/json.js';
import { DataBase } from './database.js';

const database = new DataBase();

const server = http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url;
    
    await json(request, response);

    if(method === 'GET' && url === '/users') {
        const users = database.select('users');
        const usersStringified = JSON.stringify(users);

        return response.writeHead(200).end(usersStringified);
    }

    if(method === 'POST' && url === '/users'){
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

    return response.writeHead(404).end('Endpoint Not Found');
});

server.listen(3333);