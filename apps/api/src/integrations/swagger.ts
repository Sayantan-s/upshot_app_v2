import { ORIGIN } from '@api/config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

interface ISwaggerClient {
  ui: typeof swaggerUi;
  spec: object;
}

export class Swagger {
  private swaggerSpec: object;
  private ui: typeof swaggerUi;
  private static clientInstance: ISwaggerClient | null = {
    spec: swaggerJsdoc,
    ui: swaggerUi,
  };
  constructor() {
    const options: swaggerJsdoc.Options = {
      definition: {
        openapi: '3.0.0',
        servers: [
          {
            url: `${ORIGIN}`,
          },
        ],
        info: {
          title: 'Upshot API docs',
          version: '0.0.0',
          description: 'Upshot API Description',
        },
        components: {
          securitySchemas: {
            bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
            },
          },
        },
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
      apis: ['../routes/*.ts'], //routes and schema paths
    };

    this.swaggerSpec = swaggerJsdoc(options);
    this.ui = swaggerUi;
  }
  static get client() {
    const instance = new Swagger();
    Swagger.clientInstance.spec = instance.swaggerSpec;
    Swagger.clientInstance.ui = instance.ui;
    //console.log(Swagger.clientInstance);
    return Swagger.clientInstance;
  }
}
