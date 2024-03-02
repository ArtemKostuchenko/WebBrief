const express = require('express');
const { createBrief, getBrief, getBriefs, deleteBrief } = require('../controllers/brief.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


const router = express.Router();

router.route('/').post(createBrief).get(authMiddleware, getBriefs);

router.route('/:id').get(authMiddleware, getBrief).delete(authMiddleware, deleteBrief);

module.exports = router;