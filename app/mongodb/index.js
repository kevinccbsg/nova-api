const mongoose = require('mongoose');
const { errorFactory } = require('error-handler-module');
const { DB_ERROR, DB_CONFLICT } = require('../constants/errorCodes');
const Nomination = require('./models/Nomination');

const dbConflict = errorFactory(DB_CONFLICT);
const dbError = errorFactory(DB_ERROR);

const start = async (options) => {
  await mongoose.connect(options.uri);

  const nominateNewMember = async (memberId, nominationPayload) => {
    try {
      const {
        email, description, involvement, talent, status,
      } = nominationPayload;
      const newNomination = new Nomination({
        email,
        description,
        involvement,
        talent,
        status,
        referrer: memberId,
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
