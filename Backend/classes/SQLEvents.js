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
exports.SQLEvents = void 0;
var sqlite_1 = require("sqlite");
var Event_1 = require("./Event");
var sqlite3 = require("sqlite3");
var SQLEvents = /** @class */ (function () {
    function SQLEvents() {
    }
    SQLEvents.getEvent = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: 'schedule.db',
                            driver: sqlite3.Database
                        })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get('SELECT * FROM schedule WHERE Name = ?', name)];
                    case 2:
                        result = _a.sent();
                        if (!result)
                            return [2 /*return*/, null];
                        return [2 /*return*/, new Event_1.Event(result.name, result.description, result.start_time, result.end_time, result.location, result.how)];
                }
            });
        });
    };
    SQLEvents.hasEvent = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var db, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: 'schedule.db',
                            driver: sqlite3.Database
                        })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.get('SELECT * FROM schedule WHERE Name = ?', name)];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result != undefined];
                }
            });
        });
    };
    SQLEvents.setEvent = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: 'schedule.db',
                            driver: sqlite3.Database
                        })];
                    case 1:
                        db = _a.sent();
                        console.log(event);
                        if (!(event.old && event.old !== "")) return [3 /*break*/, 3];
                        return [4 /*yield*/, db.run('UPDATE schedule SET Name = ?, Description = ?, Start_Time = ?, End_Time = ?, Location = ?, How = ? WHERE Name = ?', event.title, event.description, event.start_time, event.end_time, event.where, event.how, event.old)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, db.run('INSERT OR REPLACE INTO schedule (Name, Description, Start_Time, End_Time, Location, How) VALUES (?, ?, ?, ?, ?, ?)', event.title, event.description, event.start_time, event.end_time, event.where, event.how)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SQLEvents.getAllEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var db, results, final, _i, results_1, result, event_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: 'schedule.db',
                            driver: sqlite3.Database
                        })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.all('SELECT * FROM schedule')];
                    case 2:
                        results = _a.sent();
                        final = [];
                        for (_i = 0, results_1 = results; _i < results_1.length; _i++) {
                            result = results_1[_i];
                            event_1 = new Event_1.Event(result.name, result.description, result.start_time, result.end_time, result.location, result.how);
                            final.splice(final.length, 0, event_1);
                        }
                        return [2 /*return*/, final];
                }
            });
        });
    };
    SQLEvents.deleteEvent = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var db;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, (0, sqlite_1.open)({
                            filename: 'schedule.db',
                            driver: sqlite3.Database
                        })];
                    case 1:
                        db = _a.sent();
                        return [4 /*yield*/, db.run("DELETE FROM schedule WHERE name = ?", name)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return SQLEvents;
}());
exports.SQLEvents = SQLEvents;
//# sourceMappingURL=SQLEvents.js.map