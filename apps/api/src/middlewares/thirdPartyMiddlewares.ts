import { PORT } from '@api/config';
import { Swagger } from '@api/integrations/swagger';
import chalk from 'chalk';
import { Express, Request, Response } from 'express';

export const withSwagger = (app: Express) => {
  //Swagger Page
  app.use(
    '/docs',
    Swagger.client.ui.serve,
    Swagger.client.ui.setup(Swagger.client.spec)
  );
  //Docs in JSON format
  app.get('/docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(Swagger.client.spec);
  });

  console.log(
    chalk.bgGreen.bold.whiteBright(
      `Docs Available at http://localhost:${PORT}/docs`
    )
  );
};
