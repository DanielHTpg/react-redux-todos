const { existsSync, writeFileSync } = require('fs');
const jsonServer = require('json-server');

if (!existsSync('db.json')) {
	writeFileSync('db.json', `{"todos": []}`, { encoding: 'utf8' });
}

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3200;

server.use(middlewares);
server.use(router);

server.listen(port);
