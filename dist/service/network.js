"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NETWORK = void 0;
var ethers_1 = require("ethers");
var base_1 = require("../base");
var config_1 = require("../config");
var NODE_PROVIDERS = {
    INFURA: 'INFURA',
    CLOUDFLARE: 'CLOUDFLARE',
    GOOGLE: 'GOOGLE',
    GDIGI: 'GDIGI'
};
exports.NETWORK = {
    LOCAL: 'local',
    SEPOLIA: 'sepolia',
    MAINNET: 'mainnet',
};
function getWeb3URL(providerName, api, network) {
    switch (providerName.toUpperCase()) {
        case NODE_PROVIDERS.INFURA:
            return "".concat(api.replace('https://', "https://".concat(network, ".")));
        case NODE_PROVIDERS.CLOUDFLARE:
            return "".concat(api, "/").concat(network);
        case NODE_PROVIDERS.GOOGLE:
            if (network === exports.NETWORK.MAINNET)
                return api;
            if (network === exports.NETWORK.SEPOLIA)
                return config_1.NODE_PROVIDER_URL_SEPOLIA;
            return "".concat(config_1.NODE_PROVIDER_URL_CF, "/").concat(network);
        case NODE_PROVIDERS.GDIGI:
            return api;
        default:
            throw Error('');
    }
}
function getNetwork(network) {
    // currently subgraphs used under this function are outdated,
    // we will have namewrapper support and more attributes when latest subgraph goes to production
    var SUBGRAPH_URL;
    switch (network) {
        case exports.NETWORK.LOCAL:
            SUBGRAPH_URL = 'http://127.0.0.1:8000/subgraphs/name/graphprotocol/dgns';
            break;
        case exports.NETWORK.SEPOLIA:
            SUBGRAPH_URL =
                'https://api.thegraph.com/subgraphs/name/kimhabork/dgns';
            break;
        case exports.NETWORK.MAINNET:
            SUBGRAPH_URL = 'https://api.thegraph.com/subgraphs/name/kimhabork/dgns';
            break;
        default:
            throw new base_1.UnsupportedNetwork("Unknown network '".concat(network, "'"), 501);
    }
    var WEB3_URL = getWeb3URL(config_1.NODE_PROVIDER, config_1.NODE_PROVIDER_URL, network);
    // add source param at the end for better request measurability
    SUBGRAPH_URL = SUBGRAPH_URL + '?source=dgns-metadata';
    var provider = new ethers_1.ethers.providers.StaticJsonRpcProvider(WEB3_URL);
    return { WEB3_URL: WEB3_URL, SUBGRAPH_URL: SUBGRAPH_URL, provider: provider };
}
exports.default = getNetwork;
