import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Express,Request,Response} from 'express'
import chalk from 'chalk';
import {version} from '../../../../package.json';

const options: swaggerJsdoc.Options = {
    definition: {
        upshotapi:"0.0.0",
        info:{
            title:"Upshot API docs",
            version
        },
        components:{
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                bearerAuth:[]
            }
        ]
    },
    apis:["../routes/*.ts",""] //routes and schema paths
}

const swaggerSpec = swaggerJsdoc(options);

const swaggerDocs = (app:Express , port: number)=>{
    //Swagger Page
    app.use('/docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

    //Docs in JSON format
    app.get('docs.json', (req:Request, res: Response)=>{
        res.setHeader("Content-Type","application/json")
        res.send(swaggerSpec)
    })
    console.log(chalk.bgGreen.bold.whiteBright(`Docs Available at http://localhost:${port}/docs`))
}

export default swaggerDocs