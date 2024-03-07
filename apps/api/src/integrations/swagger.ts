//import path from 'path';
//import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

interface ISwaggerClient {
  ui: typeof swaggerUi;
  spec: object;
}

export class Swagger {
  //private swaggerSpec: object;
  private ui: typeof swaggerUi;
  private static clientInstance = {} as ISwaggerClient;
  // private static path = path.resolve(
  //   __dirname,
  //   '..',
  //   '..',
  //   '..',
  //   'apps',
  //   'api',
  //   'src',
  //   'routes'
  // );
  // private static definition: swaggerJsdoc.SwaggerDefinition = {
  //   openapi: '3.0.0',
  //   info: {
  //     title: 'Express API for JSONPlaceholder',
  //     version: '1.0.0',
  //   },
  // };
  constructor() {
    // const options: swaggerJsdoc.Options = {
    //   swaggerDefinition: Swagger.definition,
    //   apis: [`${Swagger.path}/*.route.ts`], //routes and schema paths
    // };
    // this.swaggerSpec = swaggerJsdoc(options);
    this.ui = swaggerUi;
  }
  static get client() {
    if (Swagger.clientInstance.spec && Swagger.clientInstance.ui)
      return Swagger.clientInstance;
    const instance = new Swagger();
    //Swagger.clientInstance.spec = instance.swaggerSpec;
    Swagger.clientInstance.ui = instance.ui;
    return Swagger.clientInstance;
  }
}
