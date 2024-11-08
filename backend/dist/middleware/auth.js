"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cookieAuthCheck = void 0;
const cookieAuthCheck = (req, res, next) => {
    const { user_info } = req.signedCookies;
    if (user_info) {
        next();
    }
    else {
        res.status(403).send();
    }
};
exports.cookieAuthCheck = cookieAuthCheck;
