const WebBriefModel = require('../models/brief.model');

const createBrief = async (req, res) => {
    await WebBriefModel.create(req.body);
    return res.status(201).json({ success: true });
}

module.exports = {createBrief};