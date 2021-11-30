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
var express = require("express");
var SQLEvents_1 = require("./classes/SQLEvents");
var http = require("http");
var socket_io_1 = require("socket.io");
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('files')); // Host Web Servers
/*const sslServer = https.createServer({ // Load SSL
    key: fs.readFileSync(path.join(__dirname, 'cert', 'key.key')),
    cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.crt')),
    insecureHTTPParser: true
}, app)

 */
var sslServer = http.createServer(app);
var io = new socket_io_1.Server(sslServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        allowedHeaders: ["Access-Control-Allow-Origin", "Content-Type", "Authorization"]
    }
}); // Start Socket.io
io.on("connection", function (socket) {
    //console.log("New connection")
    socket.on("disconnect", function () {
        //console.log("Disconnected")
    });
    socket.on("list", function (callback) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("List");
                    _a = callback;
                    return [4 /*yield*/, SQLEvents_1.SQLEvents.getAllEvents()];
                case 1:
                    _a.apply(void 0, [_b.sent()]);
                    return [2 /*return*/];
            }
        });
    }); });
    socket.on("update", function (data, callback) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Update");
            SQLEvents_1.SQLEvents.setEvent(data).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = io).emit;
                            _c = ["list"];
                            return [4 /*yield*/, SQLEvents_1.SQLEvents.getAllEvents()];
                        case 1:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            if (callback)
                                callback();
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) { return console.error(err); });
            return [2 /*return*/];
        });
    }); });
    socket.on("delete", function (data, callback) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("Delete");
            SQLEvents_1.SQLEvents.deleteEvent(data.title).then(function () { return __awaiter(void 0, void 0, void 0, function () {
                var _a, _b, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _b = (_a = io).emit;
                            _c = ["list"];
                            return [4 /*yield*/, SQLEvents_1.SQLEvents.getAllEvents()];
                        case 1:
                            _b.apply(_a, _c.concat([_d.sent()]));
                            if (callback)
                                callback();
                            return [2 /*return*/];
                    }
                });
            }); })["catch"](function (err) { return console.error(err); });
            return [2 /*return*/];
        });
    }); });
});
sslServer.listen(8080, function () {
    console.log("Secure Server on port 8080 is running.");
});
function eventCheck() {
    return __awaiter(this, void 0, void 0, function () {
        var events, time, _i, events_1, event_1, _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, SQLEvents_1.SQLEvents.getAllEvents()];
                case 1:
                    events = _d.sent();
                    time = Math.floor(Date.now() / 1000);
                    _i = 0, events_1 = events;
                    _d.label = 2;
                case 2:
                    if (!(_i < events_1.length)) return [3 /*break*/, 6];
                    event_1 = events_1[_i];
                    if (!(event_1.end_time <= time)) return [3 /*break*/, 5];
                    return [4 /*yield*/, SQLEvents_1.SQLEvents.deleteEvent(event_1.title)];
                case 3:
                    _d.sent();
                    _b = (_a = io).emit;
                    _c = ["list"];
                    return [4 /*yield*/, SQLEvents_1.SQLEvents.getAllEvents()];
                case 4:
                    _b.apply(_a, _c.concat([_d.sent()]));
                    _d.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 2];
                case 6: return [2 /*return*/];
            }
        });
    });
}
setInterval(eventCheck, 5000);
