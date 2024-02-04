import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

interface ISwaggerClient {
  ui: typeof swaggerUi;
  spec: object;
}

export class Swagger {
  private swaggerSpec: object;
  private ui: typeof swaggerUi;
  private static clientInstance: ISwaggerClient | null = null;
  constructor() {
    const options: swaggerJsdoc.Options = {
      definition: {
        upshotapi: '0.0.0',
        info: {
          title: 'Upshot API docs',
          version: '0.0.0',
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
      apis: ['../routes/*.ts', ''], //routes and schema paths
    };

    this.swaggerSpec = swaggerJsdoc(options);
    this.ui = swaggerUi;
  }
  static get client() {
    if (!Swagger.clientInstance) {
      const instance = new Swagger();
      Swagger.clientInstance.spec = instance.swaggerSpec;
      Swagger.clientInstance.ui = instance.ui;
    }
    return Swagger.clientInstance;
  }
}
