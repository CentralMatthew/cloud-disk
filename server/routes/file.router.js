const router = require('express').Router();
const { checkAccessToken } = require('../middlewares/auth.middleware');
const { fileController } = require('../controllers');

router.post('', checkAccessToken, fileController.createDir);
router.get('', checkAccessToken, fileController.getFiles);

module.exports = router;
