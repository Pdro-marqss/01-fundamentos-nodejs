import http from 'node:http';

const users = [];

const server = http.createServer((request, response) => {
    const method = request.method;
    const url = request.url;

    console.log(`mehod: ${method}, url: ${url}`);

    if(method === 'GET' && url === '/users') {
        const usersStringified = JSON.stringify(users);

        return response
        .setHeader('Content-type', 'application/json')
        .end(usersStringified);
    }

    if(method === 'POST' && url === '/users'){
        users.push({
            id: 1,
            name: 'Pedro',
            email: 'pedro_marquess@hotmail.com.br'
        });

        return response.writeHead(201).end();
    }

    return response.writeHead(404).end('Endpoint Not Found');
});

server.listen(3333);