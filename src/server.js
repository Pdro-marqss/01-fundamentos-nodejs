import http from 'node:http';

const users = [];

const server = http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url;
    const buffers = [];

    for await(const chunk of request) {
        buffers.push(chunk);
    }

    try {
        request.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch {
        request.body = null;
    }

    if(method === 'GET' && url === '/users') {
        const usersStringified = JSON.stringify(users);

        return response
        .setHeader('Content-type', 'application/json')
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