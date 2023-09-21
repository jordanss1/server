"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertUserHasId = exports.assertHasUser = void 0;
var assertHasUser = function (req) {
    if (typeof req.user === "undefined") {
        throw new Error("Request object not user type");
    }
};
exports.assertHasUser = assertHasUser;
var assertUserHasId = function (req) {
    var _a;
    if (typeof ((_a = req.user) === null || _a === void 0 ? void 0 : _a.id) === "undefined") {
        throw new Error("Id property is undefined on user");
    }
};
exports.assertUserHasId = assertUserHasId;
