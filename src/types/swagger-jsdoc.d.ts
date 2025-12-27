declare module "swagger-jsdoc" {
  export interface Options {
    definition: any;
    apis?: string[];
  }
  
  function swaggerJsdoc(options: Options): any;
  export default swaggerJsdoc;
}