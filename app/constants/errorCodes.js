const DB_ERROR = 'db-error';
const DB_CONFLICT = 'db-conflict-error';

const dbErrorTypes = {
  [DB_CONFLICT]: 409,
  [DB_ERROR]: 500,
};

module.exports = {
  DB_ERROR,
  DB_CONFLICT,
  dbErrorTypes,
};
