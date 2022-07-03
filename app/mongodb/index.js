const mongoose = require('mongoose');

const start = async options => {
  try {
    await mongoose.connect(options.uri);
    return {
      dbInstance: mongoose,
    };
  } catch (error) {
    console.error(error);
  }
};

module.exports = start;
