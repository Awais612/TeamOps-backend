import swaggerJsdoc from "swagger-jsdoc";
import * as dotenv from "dotenv";
dotenv.config();

interface SwaggerOptions {
  definition: object;
  apis?: string[];
}

const PORT = process.env.PORT || 3030;
const HOST = process.env.HOST || "localhost";

const options: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "TeamOps API",
      version: "1.0.0",
      description: "API documentation for TeamOps backend",
    },
    servers: [
      {
        url: `http://${HOST}:${PORT}`,
        description: "HTTP Server",
      },
      {
        url: `https://${HOST}:${PORT}`,
        description: "HTTPS Server",
      },
      {
        url: "/",
        description: "Current Server (Auto-detect Protocol)",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token (Bearer prefix will be added automatically)",
          in: "header",
        },
      },
    },
    security: [{ BearerAuth: [] }],
  },
  apis: [
    "./src/server.ts",
    "./src/routes/*.route.ts",
    "./src/routes/**/*.route.ts",
  ],
};

const specs = swaggerJsdoc(options);
export default specs;
