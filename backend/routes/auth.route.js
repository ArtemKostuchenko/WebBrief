const express = require('express');
const { login, register, validate } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.get('/validate', authMiddleware, validate);

module.exports = router;