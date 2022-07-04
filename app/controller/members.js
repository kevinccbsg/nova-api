const start = ({ store, logger }) => {
  const nominateNewMember = async (member) => {
    logger.info('Nominate new member...');
    const status = member.score.talent < 8 ? 'REJECTED' : 'ACCEPTED';
    const newMember = await store.nominateNewMember({
      email: member.email,
      description: member.description,
      involvement: member.score.involvement,
      talent: member.score.talent,
      status,
    });
    logger.info('new member Nominated...');
    return { id: newMember.id };
  };

  return { nominateNewMember };
};

module.exports = start;
