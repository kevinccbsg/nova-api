const logger = require('../../utils/logger');

const start = () => {
  const sendEmail = ({ to, subject }) => {
    logger.info(`Sending email to ${to.join(', ')} with subject: ${subject}`);
    // TODO: add email service method
  };

  return { sendEmail };
};

module.exports = start;
