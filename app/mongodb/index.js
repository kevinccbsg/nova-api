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

  const getNominations = async () => {
    const nominations = await Nomination.aggregate([
      { $match: {} },
      {
        $project: {
          _id: 0,
          id: 1,
          email: 1,
          description: 1,
          score: {
            involvement: '$involvement',
            talent: '$talent',
          },
          referrer: 1,
          dateReferred: '$createdAt',
          status: 1,
        },
      },
    ]);
    return nominations;
  };

  return {
    dbInstance: mongoose,
    models: { Nomination },
    store: {
      nominateNewMember,
      getNominations,
    },
  };
};

module.exports = start;
