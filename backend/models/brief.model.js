const mongoose = require('mongoose');

const WebBriefSchema = mongoose.Schema({
    lastName: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    cellphone: {
        type: String,
        required: true,
    },
    supportInfo: {
        type: String,
        required: true,
    },
    projectDescription: {
        type: String,
        required: true,
    },
    problems: {
        type: String,
        required: true,
    },
    expectation: {
        type: String,
        required: true,
    },
    audience: {
        type: String,
    },
    audienceInterests: {
        type: String,
    },
    keyMessages: {
        type: String,
    },
    callToAction: {
        type: String,
    },
    competitors: {
        type: String,
    },
    likeWebSites: {
        type: String,
    },
    dislikeWebSites: {
        type: String,
    },
    designStyle: {
        type: String,
    },
    brand: {
        type: String,
    },
    brandInfo: {
        type: String,
    },
    style: {
        type: String,
    },
    stylePage: {
        type: String,
    },
    likeSites: {
        type: String,
    },
    featuresWebSite: {
        type: String,
    },
    structure: {
        type: Array,
    },
    structureInfo: {
        type: String,
    },
    chaptersSite: {
        type: String,
    },
    contentPages: {
        type: String,
    },
    adaptive: {
        type: String,
    },
    adaptiveInfo: {
        type: String,
    },
    paymentSystem: {
        type: String,
    },
    paymentSystemInfo: {
        type: String,
    },
    featuresWebSite: {
        type: String,
    },
    deadline: {
        type: String,
    },
    budget: {
        type: String,
    },
    expectedResults: {
        type: String,
    },
    successSite: {
        type: String,
    },
    managerSite: {
        type: String,
    },
    managerSiteInfo: {
        type: String,
    },
    contentUs: {
        type: String,
    },
    contentUsInfo: {
        type: String,
    },
    additionalInfo: {
        type: String,
    },
});

module.exports = mongoose.model('web brief', WebBriefSchema);