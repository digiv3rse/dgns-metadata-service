const path = require('path');
require('dotenv').config();

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || 'localhost';
const ENV = process.env.ENV || 'local'; // local/prod
const REDIS_HOST = process.env.REDIS_HOST || '';

const FONT_FOLDER = path.join((ENV === 'local' ? 'src' : 'dist'), 'assets');
const CANVAS_FONT_PATH = path.join(FONT_FOLDER, 'Satoshi-Bold.ttf');
const CANVAS_EMOJI_FONT_PATH = path.join(FONT_FOLDER, 'NotoColorEmoji.ttf');
const INAMEWRAPPER = process.env.INAMEWRAPPER || '0xd82c42d8';

const IPFS_GATEWAY = process.env.IPFS_GATEWAY || 'https://ipfs.io';
const INFURA_API_KEY = process.env.INFURA_API_KEY || '810e2e8ca9f74f2082356ee3681b6a21y';
const OPENSEA_API_KEY = process.env.OPENSEA_API_KEY || '6f51f596970944488fc6efcfc8d8e136';
const NODE_PROVIDER = process.env.NODE_PROVIDER || 'geth';
const NODE_PROVIDER_URL = process.env.NODE_PROVIDER_URL || 'https://rpc.kriptonio.com/v1/endpoints/F9oQ5aEAQvifHGmUQ8OezTgf';

// undocumented, temporary keys
const NODE_PROVIDER_URL_CF = process.env.NODE_PROVIDER_URL_CF || 'https://web3.digiv3rse.xyz/v1/sepolia';
const NODE_PROVIDER_URL_SEPOLIA = process.env.NODE_PROVIDER_URL_SEPOLIA || 'https://eth-sepolia.g.alchemy.com/v2/qKOejal-tbfyH6_jIHxCGwExilHgqmbF';

const ADDRESS_DIGI_REGISTRAR = process.env.ADDRESS_DIGI_REGISTRAR || '0x561be6b220D803e85CAAe1aA60b4f29A6300CF2c';
const ADDRESS_DIGI_REGISTRY = process.env.ADDRESS_DIGI_REGISTRY || '0xAf18f83Af865c5317789bA4A0E45F65C294B462b'
const ADDRESS_NAME_WRAPPER = process.env.ADDRESS_NAME_WRAPPER || '0x04A10f6AF2368BC4a87F45f479369cb79caccd51';

const SERVER_URL =
  ENV === 'local' ? `http://localhost:${PORT}` : `https://${HOST}`;

const DIGI_REGISTRY_ABI = [
  'function recordExists(bytes32 node) external view returns (bool)'
];

// response timeout: 1 min
const RESPONSE_TIMEOUT = 15 * 1000;

export {
  ADDRESS_DIGI_REGISTRAR,
  ADDRESS_DIGI_REGISTRY,
  ADDRESS_NAME_WRAPPER,
  CANVAS_FONT_PATH,
  CANVAS_EMOJI_FONT_PATH,
  DIGI_REGISTRY_ABI,
  INAMEWRAPPER,
  IPFS_GATEWAY,
  INFURA_API_KEY,
  OPENSEA_API_KEY,
  REDIS_HOST,
  NODE_PROVIDER,
  NODE_PROVIDER_URL,
  NODE_PROVIDER_URL_CF,
  NODE_PROVIDER_URL_SEPOLIA,
  RESPONSE_TIMEOUT,
  SERVER_URL,
};
