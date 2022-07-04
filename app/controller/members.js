const { REJECTED_STATUS, ACCEPTED_STATUS } = require('../constants/app');

const start = ({ store, logger, config, email }) => {
  const isRejected = talent => talent < config.minLevel;
  const nominateNewMember = async (memberId, nomination) => {
    logger.info('Nominate new member...');
    const status = isRejected(nomination.score.talent) ? REJECTED_STATUS : ACCEPTED_STATUS;
    const newNomination = await store.nominateNewMember(memberId, {
      email: nomination.email,
      description: nomination.description,
      involvement: nomination.score.involvement,
      talent: nomination.score.talent,
      status,
    });
    if (isRejected(nomination.score.talent)) {
      await email.sendEmail({
        to: [nomination.email],
        subject: 'Nomination rejected',
      });
    }
    logger.info('new member Nominated...');
    return { id: newNomination.id };
  };

  const getNominations = async () => {
    logger.info('Retrieving nominations...');
    const nominations = await store.getNominations();
    return nominations;
  };

  return { nominateNewMember, getNominations };
};

module.exports = start;
