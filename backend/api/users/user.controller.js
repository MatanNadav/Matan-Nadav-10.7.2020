"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.login = exports.createUser = exports.getUser = void 0;
var db_service_1 = require("../../services/db.service");
var config_1 = require("../../config/config");
var jwt = require("jsonwebtoken");
function getUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var id, conn, user, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    id = req.params.userId;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, db_service_1.connect()];
                case 2:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('SELECT * FROM users WHERE id = ?', [id])];
                case 3:
                    user = _a.sent();
                    res.json(user[0]);
                    return [3 /*break*/, 5];
                case 4:
                    err_1 = _a.sent();
                    throw err_1;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.getUser = getUser;
function createUser(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var newUser, conn, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    newUser = req.body;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, db_service_1.connect()];
                case 2:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('INSERT INTO users SET ?', [newUser])];
                case 3:
                    _a.sent();
                    res.json({
                        message: "New user created"
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_2 = _a.sent();
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.createUser = createUser;
function login(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var user, conn, dbUser, userFromDB_1, err_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!req.body.user.name)
                        return [2 /*return*/, res.sendStatus(401)];
                    user = req.body.user;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, db_service_1.connect()];
                case 2:
                    conn = _a.sent();
                    return [4 /*yield*/, conn.query('SELECT * FROM users WHERE name = ?', [user.name])];
                case 3:
                    dbUser = _a.sent();
                    userFromDB_1 = dbUser[0][0];
                    console.log(dbUser);
                    console.log('=======================================================================================');
                    console.log(dbUser[0]);
                    if (!userFromDB_1 || userFromDB_1.password !== user.password)
                        return [2 /*return*/, res.sendStatus(401)]; //Authorizong the User in the DB
                    jwt.sign({ userFromDB: userFromDB_1 }, config_1.secret, { expiresIn: '10m' }, function (err, token) {
                        if (err)
                            res.sendStatus(403);
                        res.json({
                            user: userFromDB_1,
                            token: token
                        });
                    });
                    return [3 /*break*/, 5];
                case 4:
                    err_3 = _a.sent();
                    console.log('Error: problem at login user');
                    throw err_3;
                case 5: return [2 /*return*/];
            }
        });
    });
}
exports.login = login;
