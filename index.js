require('dotenv').config();
const logger = require('./utils/logger');
const serverApp = require('./app');

const PORT = process.env.PORT || 3000;

serverApp()
  .then(({ app }) => 
    app.listen(PORT, () =>
      logger.info(`Listening PORT: ${PORT}`)
    ))
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
