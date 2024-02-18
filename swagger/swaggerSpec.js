const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Fish Stories',
        version: '1.0.0',
        description: 'My Capstone project - Fish Stories - application API',
    },
    servers: [
        {
            url: 'http://localhost:3001',
        },
    ],
    tags: [
        {
            name: 'Fish Stories',
            description: 'API for video sharing posts',
        },
    ],
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
}

const options = {
    definition: swaggerDocument,
    // Paths to files containing OpenAPI definitions
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

exports.default = swaggerSpec;