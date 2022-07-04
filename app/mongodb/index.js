const mongoose = require('mongoose');
const { errorFactory } = require('error-handler-module');
const Nomination = require('./models/Nomination');

const dbConflict = errorFactory('db-conflict-error');
const dbError = errorFactory('db-error');

const start = async (options) => {
  await mongoose.connect(options.uri);

  const nominateNewMember = async (memberPayload) => {
    try {
      const {
        email, description, involvement, talent, status,
      } = memberPayload;
      const newNomination = new Nomination({
        email, description, involvement, talent, status,
      });
      const nomination = await newNomination.save();
      return { id: nomination.id };
    } catch (error) {
      if (error.message.includes('E11000 duplicate key error collection')) {
        throw dbConflict(error.message);
      }
      throw dbError(error.message);
    }
  };

  return {
    dbInstance: mongoose,
    models: { Nomination },
    store: {
      nominateNewMember,
    },
  };
};

module.exports = start;
