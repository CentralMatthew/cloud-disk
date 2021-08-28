const { User, OAuth, File } = require('../dataBase');
const { hashPassword, jwtService, fileService } = require('../services');
const { statusCode } = require('../constants');
const { AUTHORIZATION } = require('../constants/headers');
const authService = require('../services/jwt.service');
const successResult = require('../constants/successResults');

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const {
        body: { password },
      } = req;

      const hashedPassword = await hashPassword.hash(password);

      const user = await User.create({
        ...req.body,
        password: hashedPassword,
      });
      await fileService.dirBuilder(new File({ user: user.id, name: '' }));

      res.status(statusCode.CREATED).json(user);
    } catch (e) {
      next(e);
    }
  },
  login: async (req, res, next) => {
    try {
      const { password: hashedPassword } = req.user;
      const { password } = req.body;

      await hashPassword.compare(hashedPassword, password);

      const tokenPair = await jwtService.generateTokenPair();

      await OAuth.create({
        access_token: tokenPair.access_token,
        user: req.user,
      });

      res.json({
        access_token: tokenPair.access_token,
        user: req.user,
      });
    } catch (e) {
      next(e);
    }
  },
  auth: async (req, res, next) => {
    try {
      const user = await User.findOne({ _id: req.user.id });
      const tokenPair = await jwtService.generateTokenPair();

      await OAuth.create({
        access_token: tokenPair.access_token,
        user,
      });

      res.json({
        access_token: tokenPair.access_token,
        user,
      });
    } catch (e) {
      next(e);
    }
  },
  logout: async (req, res, next) => {
    try {
      const token = req.get(AUTHORIZATION);

      await OAuth.remove({ access_token: token });

      res.status(statusCode.NO_CONTENT).json(successResult.SUCCESS_LOG_OUT);
    } catch (e) {
      next(e);
    }
  },
  refresh: async (req, res, next) => {
    try {
      const refreshToken = req.get(AUTHORIZATION);

      const tokenPair = authService.generateTokenPair();

      await OAuth.findOneAndUpdate({ refreshToken }, { ...tokenPair });

      res.json({
        ...tokenPair,
        user: req.user,
      });

      res.status(statusCode.OK).json(successResult.SUCCESS_REFRESH);
    } catch (e) {
      next(e);
    }
  },
};
