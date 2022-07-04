const expressJSDocSwagger = require('express-jsdoc-swagger');
const { init } = require('express-oas-validator');

const initDocs = ({ config, app }) => new Promise((resolve, reject) => {
  const instance = expressJSDocSwagger(app)(config);
    
    instance.on('finish', swaggerDef => {
      const { validateRequest, validateResponse } = init(swaggerDef);
      resolve({ validateRequest, validateResponse });
    });

    instance.on('error', error => {
      reject(error);
    });
});

module.exports = initDocs;
