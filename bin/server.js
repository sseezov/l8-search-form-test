// @ts-check
import fastify from 'fastify';
import response from '../__tests__/__fixtures__/response.js';

const server = () => {
  const app = fastify();

  app.get('/goods', (_req, reply) => {
    reply
      .header('Content-Type', 'application/json; charset=utf-8')
      .send(JSON.stringify(response));
  });

  return app;
};

const port = 3000;

server().listen(port);
