import { Swagger } from '@api/integrations/swagger';
import express, { Request, Response } from 'express';

const swaggerMiddleware = express.Router();

//Swagger Page
swaggerMiddleware.use(
  '/docs',
  Swagger.client.ui.serve,
  Swagger.client.ui.setup(Swagger.client.spec)
);

//Docs in JSON format
swaggerMiddleware.get('/docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(Swagger.client.spec);
});

export default swaggerMiddleware;
