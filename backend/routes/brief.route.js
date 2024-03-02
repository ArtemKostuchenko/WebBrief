const express = require('express');
const { createBrief, getBrief, getBriefs, deleteBrief, updateBrief, getPDF } = require('../controllers/brief.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');


const router = express.Router();

router.route('/').post(createBrief).get(authMiddleware, getBriefs);

router.route('/:id').get(authMiddleware, getBrief).patch(authMiddleware, updateBrief).delete(authMiddleware, deleteBrief);
router.route('/:id/pdf').get(authMiddleware, getPDF);

module.exports = router;