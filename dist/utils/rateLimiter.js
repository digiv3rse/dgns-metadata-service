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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimitMiddleware = void 0;
var ioredis_1 = __importDefault(require("ioredis"));
var rate_limiter_flexible_1 = require("rate-limiter-flexible");
var config_1 = require("../config");
var rateLimiter = null;
if (config_1.REDIS_HOST) {
    var redisClient = new ioredis_1.default({
        port: 6379,
        host: config_1.REDIS_HOST,
        username: "default",
        password: "AbcDAAIncDE4YjQ0M2ZkMDU2ODA0MDlkYThhM2Y2YzBlYTk3NGFlM3AxNDY4NTE",
        enableOfflineQueue: false
    });
    redisClient.on('error', function (error) {
        console.warn('redis error', error);
    });
    var opts = {
        storeClient: redisClient,
        points: 20,
        duration: 2,
        execEvenly: false,
        blockDuration: 0,
        keyPrefix: 'ensrl', // Assign unique keys for each limiters with different purposes
    };
    rateLimiter = new rate_limiter_flexible_1.RateLimiterRedis(opts);
}
function rateLimitMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var clientIP, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!rateLimiter) {
                        return [2 /*return*/, next()];
                    }
                    clientIP = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, rateLimiter.consume(clientIP)];
                case 2:
                    _a.sent();
                    next();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    if (error_1 instanceof rate_limiter_flexible_1.RateLimiterRes) {
                        res.status(429).json({
                            message: 'Too many requests from this source, please decrease your request rate.',
                        });
                    }
                    else {
                        console.error('An unexpected error occurred:', error_1);
                        next(error_1);
                    }
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.rateLimitMiddleware = rateLimitMiddleware;
