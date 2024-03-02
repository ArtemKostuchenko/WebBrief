const WebBriefModel = require('../models/brief.model');
const { NotFoundError } = require('../errors');

const createBrief = async (req, res) => {
    await WebBriefModel.create(req.body);
    return res.status(201).json({ success: true });
}

const getBrief = async (req, res) => {
    const { id: briefId } = req.params;

    const brief = await WebBriefModel.findById(briefId);

    if (!brief) {
        throw new NotFoundError("Brief not found");
    }

    return res.status(200).json({ data: brief });
}

const deleteBrief = async (req, res) => {
    const { id: briefId } = req.params;

    const brief = await WebBriefModel.findById(briefId);

    if (!brief) {
        throw new NotFoundError("Brief not found");
    }

    await brief.deleteOne();
    return res.status(200).json({ success: true });
}

const getBriefs = async (req, res) => {
    const { sort, projectName, lastName, firstName, cellphone} = req.query;

    const queryObj = {};

    if (projectName) {
        queryObj.projectName = { $regex: projectName, $options: 'i', };
    }

    if (lastName) {
        queryObj.lastName = { $regex: lastName, $options: 'i', };
    }

    if (firstName) {
        queryObj.firstName = { $regex: firstName, $options: 'i', };
    }

    if (cellphone) {
        queryObj.cellphone = { $regex: cellphone, $options: 'i', };
    }

    let briefWithQuery = WebBriefModel.find(queryObj);

    if (sort) {
        switch (sort) {
            case 'new':
                briefWithQuery = briefWithQuery.sort({createdAt: -1});
                break;
            case 'old':
                briefWithQuery = briefWithQuery.sort({createdAt: 1});
                break;
            case 'asc':
                briefWithQuery = briefWithQuery.sort({firstName: -1});
                break;
            case 'desc':
                briefWithQuery = briefWithQuery.sort({firstName: 1});
                break;
            default:
                briefWithQuery = briefWithQuery.sort({createdAt: -1});
                break;
        }
    } else {
        briefWithQuery = briefWithQuery.sort({createdAt: -1})
    }

    const brief = await briefWithQuery;

    return res.status(200).json({ data: brief });
}

module.exports = { createBrief, getBrief, getBriefs, deleteBrief };