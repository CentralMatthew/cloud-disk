const { statusCode } = require('../constants');
const {
  EMAIL_IS_NOT_AVAILABLE,
  INVALID_KEY_VALUE,
  USER_NOT_FOUND,
  NO_TOKEN,
  WRONG_TOKEN,
} = require('../errors/error-message');
const { ErrorHandler } = require('../errors');
const { User, OAuth } = require('../dataBase');
const { authValidator } = require('../validators');
const { AUTHORIZATION } = require('../constants/headers');
const { REFRESH } = require('../constants/tokens');
const { jwtService } = require('../services');

module.exports = {
  isEmailBusy: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (user) {
        throw new ErrorHandler(
          statusCode.CONFLICT,
          EMAIL_IS_NOT_AVAILABLE.message,
          EMAIL_IS_NOT_AVAILABLE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },
  checkValidity: (req, res, next) => {
    try {
      const { error } = authValidator.registration.validate(req.body);

      if (error) {
        throw new ErrorHandler(
          statusCode.BAD_REQUEST,
          error.details[0].message,
          INVALID_KEY_VALUE.code
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  },

  getUserByDynamicParam:
    (paramName, searchIn = 'body', dbKey = paramName) =>
    async (req, res, next) => {
      try {
        const valueOfParams = req[searchIn][paramName];

        const user = await User.findOne({ [dbKey]: valueOfParams })
          .select('+password')
          .lean();

        if (!user) {
          throw new ErrorHandler(
            statusCode.NOT_FOUND,
            USER_NOT_FOUND.message,
            USER_NOT_FOUND.code
          );
        }

        req.user = user;

        next();
      } catch (e) {
        next(e);
      }
    },

  checkRefreshToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          NO_TOKEN.message,
          NO_TOKEN.code
        );
      }

      await jwtService.verifyToken(token, REFRESH);

      const findedUser = await OAuth.findOne({ refreshToken: token });

      if (!findedUser) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          WRONG_TOKEN.message,
          WRONG_TOKEN.code
        );
      }

      req.user = findedUser.user;

      next();
    } catch (e) {
      next(e);
    }
  },

  checkAccessToken: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      if (!token) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          NO_TOKEN.message,
          NO_TOKEN.code
        );
      }

      await jwtService.verifyToken(token);
      const findedUser = await OAuth.findOne({ access_token: token });

      if (!findedUser) {
        throw new ErrorHandler(
          statusCode.UNAUTHORIZED,
          WRONG_TOKEN.message,
          WRONG_TOKEN.code
        );
      }

      req.user = findedUser.user;

      next();
    } catch (e) {
      next(e);
    }
  },
};
