const router = require('express').Router();

const { authController } = require('../controllers');
const {
  isEmailBusy,
  checkValidity,
  getUserByDynamicParam,
  checkAccessToken,
} = require('../middlewares/auth.middleware');
const { authMiddleware } = require('../middlewares');

router.post(
  '/registration',
  checkValidity,
  isEmailBusy,
  authController.createUser
);

router.post(
  '/login',
  checkValidity,
  getUserByDynamicParam('email'),
  authController.login
);

router.post('/logout', checkAccessToken, authController.logout);

router.post(
  '/refresh',
  authMiddleware.checkRefreshToken,
  authController.refresh
);

router.get('/auth', authMiddleware.checkAccessToken, authController.auth);

module.exports = router;
