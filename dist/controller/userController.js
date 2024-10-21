"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupController = signupController;
exports.getUserInfroController = getUserInfroController;
exports.updateAvtarController = updateAvtarController;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = "Kirais";
let USERS = {};
let ROOMS = {};
function signupController(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).json({
            msg: `You haven't provide either username or password `,
        });
        return;
    }
    if (USERS[username]) {
        res.status(409).json({
            msg: `This username is already exist`,
        });
        return;
    }
    USERS[username] = { username, password };
    const tokensign = jsonwebtoken_1.default.sign({ username }, JWT_SECRET, { expiresIn: "1h" });
    const token = `Bearer ${tokensign}`;
    res.status(201).json({
        sessionToken: token,
        userId: username,
    });
}
function getUserInfroController(req, res) {
    const userId = req.params.userId;
    const user = USERS[userId];
    if (!user) {
        res.status(404).json({
            msg: `user doesn't exist`,
        });
        return;
    }
    res.status(200).json({
        username: user.username,
        avtaarUrl: user.avtaarUrl,
    });
}
function updateAvtarController(req, res) {
    const userId = req.params.userId;
    const { avtaarUrl } = req.body;
    const user = USERS[userId];
    if (!user) {
        res.status(404).json({
            msg: `user doesn't exist`,
        });
        return;
    }
    user.avtaarUrl = avtaarUrl;
    res.status(200).json({
        avtaarUrl,
    });
}
