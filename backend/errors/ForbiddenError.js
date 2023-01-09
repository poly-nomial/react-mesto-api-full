const { FORBIDDEN_ERROR } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = FORBIDDEN_ERROR;
    this.name = 'ForbiddenError';
  }
}

module.exports = ForbiddenError;
