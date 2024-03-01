const express = require('express');
const { mainPage, loginPage } = require('../controllers/pages.controller');

const router = express.Router();

router.get('/', mainPage);
router.get('/login', loginPage);

module.exports = router