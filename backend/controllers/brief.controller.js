const puppeteer = require('puppeteer');
const Handlebars = require('handlebars');
const fs = require('fs')
const { resolve } = require('path');
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

const updateBrief = async (req, res) => {
    const { id: briefId } = req.params;

    const {
        lastName,
        firstName,
        cellphone,
        supportInfo,
        projectName,
        projectDescription,
        problems,
        expectation,
        audience,
        audienceInterests,
        keyMessages,
        callToAction,
        competitors,
        likeWebSites,
        dislikeWebSites,
        designStyle,
        brand,
        brandInfo,
        style,
        stylePage,
        likeSites,
        featuresWebSite,
        structure,
        structureInfo,
        chaptersSite,
        contentPages,
        adaptive,
        adaptiveInfo,
        paymentSystem,
        paymentSystemInfo,
        deadline,
        budget,
        expectedResults,
        successSite,
        managerSite,
        managerSiteInfo,
        contentUs,
        contentUsInfo,
        additionalInfo, } = req.body;

    const brief = await WebBriefModel.findById(briefId);

    if (!brief) {
        throw new NotFoundError("Brief not found");
    }

    brief.lastName = lastName || brief.lastName;
    brief.firstName = firstName || brief.firstName;
    brief.cellphone = cellphone || brief.cellphone;
    brief.supportInfo = supportInfo || brief.supportInfo;
    brief.projectName = projectName || brief.projectName;
    brief.projectDescription = projectDescription || brief.projectDescription;
    brief.problems = problems || brief.problems;
    brief.expectation = expectation || brief.expectation;
    brief.audience = audience || brief.audience;
    brief.audienceInterests = audienceInterests || brief.audienceInterests;
    brief.keyMessages = keyMessages || brief.keyMessages;
    brief.callToAction = callToAction || brief.callToAction;
    brief.competitors = competitors || brief.competitors;
    brief.likeWebSites = likeWebSites || brief.likeWebSites;
    brief.dislikeWebSites = dislikeWebSites || brief.dislikeWebSites;
    brief.designStyle = designStyle || brief.designStyle;
    brief.brand = brand || brief.brand;
    brief.brandInfo = brandInfo || brief.brandInfo;
    brief.style = style || brief.style;
    brief.stylePage = stylePage || brief.stylePage;
    brief.likeSites = likeSites || brief.likeSites;
    brief.featuresWebSite = featuresWebSite || brief.featuresWebSite;
    brief.structure = structure || brief.structure;
    brief.structureInfo = structureInfo || brief.structureInfo;
    brief.chaptersSite = chaptersSite || brief.chaptersSite;
    brief.contentPages = contentPages || brief.contentPages;
    brief.adaptive = adaptive || brief.adaptive;
    brief.adaptiveInfo = adaptiveInfo || brief.adaptiveInfo;
    brief.paymentSystem = paymentSystem || brief.paymentSystem;
    brief.paymentSystemInfo = paymentSystemInfo || brief.paymentSystemInfo;
    brief.deadline = deadline || brief.deadline;
    brief.budget = budget || brief.budget;
    brief.expectedResults = expectedResults || brief.expectedResults;
    brief.successSite = successSite || brief.successSite;
    brief.managerSite = managerSite || brief.managerSite;
    brief.managerSiteInfo = managerSiteInfo || brief.managerSiteInfo;
    brief.contentUs = contentUs || brief.contentUs;
    brief.contentUsInfo = contentUsInfo || brief.contentUsInfo;
    brief.additionalInfo = additionalInfo || brief.additionalInfo;

    await brief.save();
    return res.status(200).json({ success: true });
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
    const { sort, projectName, lastName, firstName, cellphone } = req.query;

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
                briefWithQuery = briefWithQuery.sort({ createdAt: -1 });
                break;
            case 'old':
                briefWithQuery = briefWithQuery.sort({ createdAt: 1 });
                break;
            case 'asc':
                briefWithQuery = briefWithQuery.sort({ projectName: 1 });
                break;
            case 'desc':
                briefWithQuery = briefWithQuery.sort({ projectName: -1 });
                break;
            default:
                briefWithQuery = briefWithQuery.sort({ createdAt: -1 });
                break;
        }
    } else {
        briefWithQuery = briefWithQuery.sort({ projectName: -1 })
    }

    const brief = await briefWithQuery;

    return res.status(200).json({ data: brief });
}

const getPDF = async (req, res) => {
    const { id: briefId } = req.params;

    const brief = await WebBriefModel.findById(briefId);

    if (!brief) {
        throw new NotFoundError("Brief not found");
    }

    const formattedDate = new Date(brief.createdAt).toISOString().split('T')[0];
    const name = `Бриф_${brief.lastName}_${brief.firstName}_${brief.projectName}_${formattedDate}.pdf`;


    let configLaunch = {
        headless: true,
        ignoreDefaultArgs: ['--disable-extensions'],
    };

    const browser = await puppeteer.launch(configLaunch);

    const page = await browser.newPage();
    const waitUntil = 'load';

    const templateDir = resolve(__dirname, '..', 'views', 'template-pdf.hbs');
    const file = fs.readFileSync(templateDir, 'utf-8');
    const fileCompiled = Handlebars.compile(file);
    const fileHTML = fileCompiled({
        lastName: brief.lastName,
        firstName: brief.firstName,
        cellphone: brief.cellphone,
        supportInfo: brief.supportInfo,
        projectName: brief.projectName,
        projectDescription: brief.projectDescription,
        problems: brief.problems,
        expectation: brief.expectation,
        audience: brief.audience,
        audienceInterests: brief.audienceInterests,
        keyMessages: brief.keyMessages,
        callToAction: brief.callToAction,
        competitors: brief.competitors,
        likeWebSites: brief.likeWebSites,
        dislikeWebSites: brief.dislikeWebSites,
        designStyle: brief.designStyle,
        brand: brief.brand,
        brandInfo: brief.brandInfo,
        style: brief.style,
        stylePage: brief.stylePage,
        likeSites: brief.likeSites,
        featuresWebSite: brief.featuresWebSite,
        structure: brief.structure,
        structureInfo: brief.structureInfo,
        chaptersSite: brief.chaptersSite,
        contentPages: brief.contentPages,
        adaptive: brief.adaptive,
        adaptiveInfo: brief.adaptiveInfo,
        paymentSystem: brief.paymentSystem,
        paymentSystemInfo: brief.paymentSystemInfo,
        deadline: brief.deadline,
        budget: brief.budget,
        expectedResults: brief.expectedResults,
        successSite: brief.successSite,
        managerSite: brief.managerSite,
        managerSiteInfo: brief.managerSiteInfo,
        contentUs: brief.contentUs,
        contentUsInfo: brief.contentUsInfo,
        additionalInfo: brief.additionalInfo
    });

    await page.setContent(fileHTML, {
        waitUntil,
    });

    await page.setDefaultNavigationTimeout(0);

    await page.pdf({
        headerTemplate: 'title',
        format: 'A4',
        path: `tmp/${name}`,
        preferCSSPageSize: true,
        printBackground: true,
    });

    await browser.close();
    const pdfFile = fs.readFileSync(`tmp/${name}`);

    fs.unlinkSync(`tmp/${name}`);

    const fileName = encodeURIComponent(name);
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.contentType('application/pdf');
    res.send(pdfFile);
}

module.exports = { createBrief, getBrief, updateBrief, getBriefs, deleteBrief, getPDF };