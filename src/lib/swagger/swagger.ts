import swaggerAutogen from 'swagger-autogen';

const baseDoc = {
  info: {
    version: '1.0.0',           
    title: 'CPAAS REST API', 
    description: 'API Documentation'
  },
  servers: [
    {
      url: 'http://localhost:8000/api',
      description: 'Development server'
    },
  ],
  tags: [                   
    {
      name: '',             
      description: ''       
    },
  ],
  components: {}
};


const outputFile = './swagger.json';
const routes = ['./src/routes/index.ts'];

const options = {
  openapi: '3.0.0',     // Enable/Disable OpenAPI.                        By default is null
  language: 'en-US',     // Change response language.                      By default is 'en-US'
  disableLogs: false,    // Enable/Disable logs.                           By default is false
  autoHeaders: true,    // Enable/Disable automatic headers recognition.  By default is true
  autoQuery: true,    // Enable/Disable automatic query recognition.    By default is true
  autoBody: true,    // Enable/Disable automatic body recognition.     By default is true
  writeOutputFile: true     // Enable/Disable writing the output file.        By default is true
};


swaggerAutogen(options)(outputFile, routes, baseDoc);
