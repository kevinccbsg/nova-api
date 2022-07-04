module.exports = {
  mongo: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/nova',
  },
  controller: {
    minLevel: 8,
  },
};
