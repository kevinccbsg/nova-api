const mongoose = require('mongoose');
const Member = require('./models/Member');

const start = async (options) => {
  await mongoose.connect(options.uri);

  const nominateNewMember = async (memberPayload) => {
    const {
      email, description, involvement, talent, status,
    } = memberPayload;
    const newMemeber = new Member({
      email, description, involvement, talent, status,
    });
    const member = await newMemeber.save();
    return { id: member.id };
  };

  return {
    dbInstance: mongoose,
    models: { Member },
    store: {
      nominateNewMember,
    },
  };
};

module.exports = start;
