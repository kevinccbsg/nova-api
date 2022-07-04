const { REJECTED_STATUS, ACCEPTED_STATUS } = require('../constants/app');

const start = ({ store, logger, config }) => {
  const nominateNewMember = async (memberId, nomination) => {
    logger.info('Nominate new member...');
    const status = nomination.score.talent < config.minLevel ? REJECTED_STATUS : ACCEPTED_STATUS;
    const newNomination = await store.nominateNewMember(memberId, {
      email: nomination.email,
      description: nomination.description,
      involvement: nomination.score.involvement,
      talent: nomination.score.talent,
      status,
    });
    logger.info('new member Nominated...');
    return { id: newNomination.id };
  };

  return { nominateNewMember };
};

module.exports = start;
