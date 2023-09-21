"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = require("mongoose");
const requireCredits_1 = __importDefault(require("../middlewares/requireCredits"));
const requireLogin_1 = __importDefault(require("../middlewares/requireLogin"));
const Mailgun_1 = __importDefault(require("../services/Mailgun"));
const surveyTemplate_1 = __importDefault(require("../services/emailTemplates/surveyTemplate"));
const types_1 = require("../types");
const Survey = (0, mongoose_1.model)("surveys");
const surveyRoutes = (app) => {
    app.post("/api/surveys", requireLogin_1.default, requireCredits_1.default, async (req, res) => {
        (0, types_1.assertUserHasId)(req);
        const { title, subject, body, recipients } = req.body;
        const survey = await new Survey({
            _user: req.user?.id,
            title,
            subject,
            body,
            recipients: recipients
                .split(",")
                .map((email) => ({ email: email.trim(), responded: false })),
            dateSent: Date.now(),
        }).save();
        const mailer = new Mailgun_1.default(survey.subject, survey.recipients, (0, surveyTemplate_1.default)(survey.body));
        const mailerResponse = await mailer.send();
        console.log(mailerResponse);
    });
    app.post("/api/surveys/webhook", body_parser_1.default.urlencoded(), (req, res) => { });
};
exports.default = surveyRoutes;
