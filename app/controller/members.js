const start = ({ store, logger }) => {
  const nominateNewMember = async (member) => {
    logger.info('Nominate new member...');
    const status = member.score.talent < 8 ? 'REJECTED' : 'ACCEPTED';
    const newNomination = await store.nominateNewMember({
      email: member.email,
      description: member.description,
      involvement: member.score.involvement,
      talent: member.score.talent,
      status,
    });
    logger.info('new member Nominated...');
    return { id: newNomination.id };
  };

  return { nominateNewMember };
};

module.exports = start;
