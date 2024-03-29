const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDocument = {
    openapi: '3.0.0',
    info: {
        title: 'Fish Stories',
        version: '1.0.0',
        description: 'My Capstone project - Fish Stories - application API',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
            },
        },
    },
    security: [{
        bearerAuth: []
    }],
    servers: [
        {
            url: process.env.BASE_URL || 'http://localhost:3001',
        },
    ],
    tags: [
        {
            name: 'Fish Stories',
            description: 'API for video sharing web app',
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