const start = ({ store, logger }) => {
  const nominateNewMember = async (memberId, nomination) => {
    logger.info('Nominate new member...');
    const status = nomination.score.talent < 8 ? 'REJECTED' : 'ACCEPTED';
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
