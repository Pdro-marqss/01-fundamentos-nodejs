import http from 'node:http';
import { routes } from './routes.js';
import { json } from './middlewares/json.js';

const server = http.createServer(async (request, response) => {
    const method = request.method;
    const url = request.url;
    
    await json(request, response);

    const route = routes.find((route) => {
        return route.method === method && route.path === url
    });

    if (route) {
        return route.handler(request, response);
    }

    return response.writeHead(404).end('Endpoint Not Found');
});

server.listen(3333);