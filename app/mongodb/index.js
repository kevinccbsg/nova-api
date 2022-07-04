const mongoose = require('mongoose');
const {
  CustomErrorTypes,
  errorFactory,
} = require('error-handler-module');
const Member = require('./models/Member');

const dbConflict = errorFactory('db-conflict-error');
const dbError = errorFactory('db-error');

const start = async (options) => {
  await mongoose.connect(options.uri);

  const nominateNewMember = async (memberPayload) => {
    try {
      const {
        email, description, involvement, talent, status,
      } = memberPayload;
      const newMemeber = new Member({
        email, description, involvement, talent, status,
      });
      const member = await newMemeber.save();
      return { id: member.id };
    } catch (error) {
      if (error.message.includes('E11000 duplicate key error collection')) {
        throw dbConflict(error.message);
      }
      throw dbError(error.message);
    }
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
