"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SERVER_URL = exports.RESPONSE_TIMEOUT = exports.NODE_PROVIDER_URL_SEPOLIA = exports.NODE_PROVIDER_URL_CF = exports.NODE_PROVIDER_URL = exports.NODE_PROVIDER = exports.REDIS_HOST = exports.OPDGNSEA_API_KEY = exports.INFURA_API_KEY = exports.IPFS_GATEWAY = exports.INAMEWRAPPER = exports.DIGI_REGISTRY_ABI = exports.CANVAS_EMOJI_FONT_PATH = exports.CANVAS_FONT_PATH = exports.ADDRESS_NAME_WRAPPER = exports.ADDRESS_DIGI_REGISTRY = exports.ADDRESS_DIGI_REGISTRAR = void 0;
var path = require('path');
require('dotenv').config();
var PORT = process.env.PORT || 8080;
var HOST = process.env.HOST || 'localhost';
var ENV = process.env.ENV || 'local'; // local/prod
var REDIS_HOST = process.env.REDIS_HOST || '';
exports.REDIS_HOST = REDIS_HOST;
var FONT_FOLDER = path.join((ENV === 'local' ? 'src' : 'dist'), 'assets');
var CANVAS_FONT_PATH = path.join(FONT_FOLDER, 'Satoshi-Bold.ttf');
exports.CANVAS_FONT_PATH = CANVAS_FONT_PATH;
var CANVAS_EMOJI_FONT_PATH = path.join(FONT_FOLDER, 'NotoColorEmoji.ttf');
exports.CANVAS_EMOJI_FONT_PATH = CANVAS_EMOJI_FONT_PATH;
var INAMEWRAPPER = process.env.INAMEWRAPPER || '0xd82c42d8';
exports.INAMEWRAPPER = INAMEWRAPPER;
var IPFS_GATEWAY = process.env.IPFS_GATEWAY || 'https://ipfs.io';
exports.IPFS_GATEWAY = IPFS_GATEWAY;
var INFURA_API_KEY = process.env.INFURA_API_KEY || '810e2e8ca9f74f2082356ee3681b6a21y';
exports.INFURA_API_KEY = INFURA_API_KEY;
var OPDGNSEA_API_KEY = process.env.OPDGNSEA_API_KEY || '6f51f596970944488fc6efcfc8d8e136';
exports.OPDGNSEA_API_KEY = OPDGNSEA_API_KEY;
var NODE_PROVIDER = process.env.NODE_PROVIDER || 'geth';
exports.NODE_PROVIDER = NODE_PROVIDER;
var NODE_PROVIDER_URL = process.env.NODE_PROVIDER_URL || 'https://rpc.kriptonio.com/v1/endpoints/F9oQ5aEAQvifHGmUQ8OezTgf';
exports.NODE_PROVIDER_URL = NODE_PROVIDER_URL;
// undocumented, temporary keys
var NODE_PROVIDER_URL_CF = process.env.NODE_PROVIDER_URL_CF || 'https://web3.digiv3rse.xyz/v1/sepolia';
exports.NODE_PROVIDER_URL_CF = NODE_PROVIDER_URL_CF;
var NODE_PROVIDER_URL_SEPOLIA = process.env.NODE_PROVIDER_URL_SEPOLIA || 'https://eth-sepolia.g.alchemy.com/v2/qKOejal-tbfyH6_jIHxCGwExilHgqmbF';
exports.NODE_PROVIDER_URL_SEPOLIA = NODE_PROVIDER_URL_SEPOLIA;
var ADDRESS_DIGI_REGISTRAR = process.env.ADDRESS_DIGI_REGISTRAR || '0x561be6b220D803e85CAAe1aA60b4f29A6300CF2c';
exports.ADDRESS_DIGI_REGISTRAR = ADDRESS_DIGI_REGISTRAR;
var ADDRESS_DIGI_REGISTRY = process.env.ADDRESS_DIGI_REGISTRY || '0x2B998843f58b5450C1C9c9f23c50c37B94603409';
exports.ADDRESS_DIGI_REGISTRY = ADDRESS_DIGI_REGISTRY;
var ADDRESS_NAME_WRAPPER = process.env.ADDRESS_NAME_WRAPPER || '0x04A10f6AF2368BC4a87F45f479369cb79caccd51';
exports.ADDRESS_NAME_WRAPPER = ADDRESS_NAME_WRAPPER;
var SERVER_URL = ENV === 'local' ? "http://localhost:".concat(PORT) : "https://".concat(HOST);
exports.SERVER_URL = SERVER_URL;
var DIGI_REGISTRY_ABI = [
    'function recordExists(bytes32 node) external view returns (bool)'
];
exports.DIGI_REGISTRY_ABI = DIGI_REGISTRY_ABI;
// response timeout: 1 min
var RESPONSE_TIMEOUT = 15 * 1000;
exports.RESPONSE_TIMEOUT = RESPONSE_TIMEOUT;
