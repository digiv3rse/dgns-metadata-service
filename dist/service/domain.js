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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomain = void 0;
var graphql_request_1 = require("graphql-request");
var ethers_1 = require("ethers");
var subgraph_1 = require("./subgraph");
var metadata_1 = require("./metadata");
var avatar_1 = require("./avatar");
var base_1 = require("../base");
var fuse_1 = require("../utils/fuse");
var namehash_1 = require("../utils/namehash");
var eth = '0x93cdeb708b7545dc668eb9280176169d1c33cfd8ed6f04690a0bcc88a93fc4ae';
var GRACE_PERIOD_MS = 7776000000; // 90 days as milliseconds
function getDomain(provider, networkName, SUBGRAPH_URL, contractAddress, tokenId, version, loadImages) {
    if (loadImages === void 0) { loadImages = true; }
    return __awaiter(this, void 0, void 0, function () {
        function requestAvatar() {
            return __awaiter(this, void 0, void 0, function () {
                var _a, buffer, mimeType, base64, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, (0, avatar_1.getAvatarImage)(provider, name)];
                        case 1:
                            _a = __read.apply(void 0, [_c.sent(), 2]), buffer = _a[0], mimeType = _a[1];
                            if (mimeType === 'text/html')
                                return [2 /*return*/];
                            base64 = buffer.toString('base64');
                            return [2 /*return*/, [base64, mimeType]];
                        case 2:
                            _b = _c.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            });
        }
        function requestMedia(isAvatarExist) {
            return __awaiter(this, void 0, void 0, function () {
                var avatar, _a, base64, mimeType;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!loadImages) return [3 /*break*/, 3];
                            if (!isAvatarExist) return [3 /*break*/, 2];
                            return [4 /*yield*/, requestAvatar()];
                        case 1:
                            avatar = _b.sent();
                            if (avatar) {
                                _a = __read(avatar, 2), base64 = _a[0], mimeType = _a[1];
                                metadata.setBackground(base64, mimeType);
                            }
                            _b.label = 2;
                        case 2:
                            metadata.generateImage();
                            return [3 /*break*/, 4];
                        case 3:
                            metadata.setBackground("https://metadata.dgns.domains/".concat(networkName, "/avatar/").concat(name));
                            metadata.setImage("https://metadata.dgns.domains/".concat(networkName, "/").concat(contractAddress, "/").concat(hexId, "/image"));
                            _b.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        function requestAttributes() {
            return __awaiter(this, void 0, void 0, function () {
                var registrations, registration, registered_date, expiration_date, _a, fuses, expiryDate, decodedFuses;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!(parent.id === eth)) return [3 /*break*/, 2];
                            return [4 /*yield*/, (0, graphql_request_1.request)(SUBGRAPH_URL, subgraph_1.GET_REGISTRATIONS, {
                                    labelhash: labelhash,
                                })];
                        case 1:
                            registrations = (_b.sent()).registrations;
                            registration = registrations[0];
                            registered_date = registration.registrationDate * 1000;
                            expiration_date = registration.expiryDate * 1000;
                            if (expiration_date + GRACE_PERIOD_MS < +new Date()) {
                                throw new base_1.ExpiredNameError("'".concat(name, "' is already been expired at ").concat(new Date(expiration_date).toUTCString(), "."), 410);
                            }
                            if (registration) {
                                metadata.addAttribute({
                                    trait_type: 'Registration Date',
                                    display_type: 'date',
                                    value: registered_date,
                                });
                                metadata.addAttribute({
                                    trait_type: 'Expiration Date',
                                    display_type: 'date',
                                    value: expiration_date,
                                });
                            }
                            _b.label = 2;
                        case 2:
                            if (!(version === base_1.Version.v2)) return [3 /*break*/, 4];
                            return [4 /*yield*/, (0, graphql_request_1.request)(SUBGRAPH_URL, subgraph_1.GET_WRAPPED_DOMAIN, {
                                    tokenId: namehash,
                                })];
                        case 3:
                            _a = (_b.sent()).wrappedDomain, fuses = _a.fuses, expiryDate = _a.expiryDate;
                            decodedFuses = (0, fuse_1.decodeFuses)(fuses);
                            metadata.addAttribute({
                                trait_type: 'Namewrapper Fuse States',
                                display_type: 'object',
                                value: decodedFuses,
                            });
                            metadata.addAttribute({
                                trait_type: 'Namewrapper Expiry Date',
                                display_type: 'date',
                                value: expiryDate * 1000,
                            });
                            metadata.addAttribute({
                                trait_type: 'Namewrapper State',
                                display_type: 'string',
                                value: (0, fuse_1.getWrapperState)(decodedFuses),
                            });
                            _b.label = 4;
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        var hexId, intId, queryDocument, result, domain, name, labelhash, createdAt, parent, resolver, namehash, metadata, isAvatarExist;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tokenId.match(/^0x/)) {
                        intId = tokenId;
                        hexId = ethers_1.ethers.utils.hexZeroPad(ethers_1.ethers.utils.hexlify(ethers_1.ethers.BigNumber.from(tokenId)), 32);
                    }
                    else {
                        intId = ethers_1.ethers.BigNumber.from(tokenId).toString();
                        hexId = tokenId;
                    }
                    queryDocument = version !== base_1.Version.v2 ? subgraph_1.GET_DOMAINS_BY_LABELHASH : subgraph_1.GET_DOMAINS;
                    return [4 /*yield*/, (0, graphql_request_1.request)(SUBGRAPH_URL, queryDocument, { tokenId: hexId })];
                case 1:
                    result = _a.sent();
                    domain = version !== base_1.Version.v2 ? result.domains[0] : result.domain;
                    if (!(domain && Object.keys(domain).length))
                        throw new base_1.SubgraphRecordNotFound("No record for ".concat(hexId));
                    name = domain.name, labelhash = domain.labelhash, createdAt = domain.createdAt, parent = domain.parent, resolver = domain.resolver, namehash = domain.id;
                    /**
                     * IMPORTANT
                     *
                     * This check must be done in any case,
                     * the reason is unfortunately the graph does strip null characters
                     * from names, so even though the namehash is different,
                     * domains with or without null byte look identical
                     */
                    if ((0, namehash_1.getNamehash)(name) !== namehash) {
                        throw new base_1.NamehashMismatchError("TokenID of the query does not match with namehash of ".concat(name), 404);
                    }
                    metadata = new metadata_1.Metadata({
                        name: name,
                        created_date: createdAt,
                        tokenId: hexId,
                        version: version,
                    });
                    isAvatarExist = (resolver === null || resolver === void 0 ? void 0 : resolver.texts) && resolver.texts.includes('avatar');
                    return [4 /*yield*/, Promise.all([requestMedia(isAvatarExist), requestAttributes()])];
                case 2:
                    _a.sent();
                    return [2 /*return*/, metadata];
            }
        });
    });
}
exports.getDomain = getDomain;
