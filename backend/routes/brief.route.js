const express = require('express');
const { createBrief } = require('../controllers/brief.controller');
const router = express.Router();

router.route('/').post(createBrief);

module.exports = router;