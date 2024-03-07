import { Swagger } from '@api/integrations/swagger';
import express, { Request, Response } from 'express';
import YAML from 'yamljs';
import path from 'path';

const swaggerMiddleware = express.Router();
const swaggerPath = path.resolve(
  __dirname,
  '..',
  '..',
  '..',
  'apps',
  'api',
);
const swaggerDocument = YAML.load(swaggerPath+"/swagger-config.yaml");

//Swagger Page
swaggerMiddleware.use(
  '/docs',
  Swagger.client.ui.serve,
  Swagger.client.ui.setup(swaggerDocument)
);

//Docs in JSON format
swaggerMiddleware.get('/docs.json', (req: Request, res: Response) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(Swagger.client.spec);
});

export default swaggerMiddleware;
