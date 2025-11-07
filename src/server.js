import http from 'node:http';
import { json } from './middlewares/json.js';

const users = [];

const server = http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url;
    
    await json(request, response);

    if(method === 'GET' && url === '/users') {
        const usersStringified = JSON.stringify(users);

        return response
        .end(usersStringified);
    }

    if(method === 'POST' && url === '/users'){
        if(request.body === null) return response.writeHead(400).end('Body não possui valor valido (name, email)');

        const name = request.body.name;
        const email = request.body.email;

        users.push({
            id: 1,
            name,
            email
        });

        return response.writeHead(201).end();
    }

    return response.writeHead(404).end('Endpoint Not Found');
});

server.listen(3333);