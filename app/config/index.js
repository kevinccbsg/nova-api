const { join } = require('path');

module.exports = {
  mongo: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/nova',
  },
  controller: {
    minLevel: 8,
  },
  swagger: {
    info: {
      version: '1.0.0',
      title: 'Nova API',
      license: {
        name: 'MIT',
      },
    },
    security: {
      BasicAuth: {
        type: 'http',
        scheme: 'basic',
      },
    },
    baseDir: join(__dirname, '..'),
    // Glob pattern to find your jsdoc files (multiple patterns can be added in an array)
    filesPattern: [
      './routes/**.js',
      './routes/schemas/*.js',
    ],
    // URL where SwaggerUI will be rendered
    swaggerUIPath: '/api-docs',
  },
};
