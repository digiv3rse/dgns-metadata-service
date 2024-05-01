"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dgnsMetadata_1 = require("./controller/dgnsMetadata");
var dgnsImage_1 = require("./controller/dgnsImage");
var dgnsRasterize_1 = require("./controller/dgnsRasterize");
var avatarMetadata_1 = require("./controller/avatarMetadata");
var avatarImage_1 = require("./controller/avatarImage");
var queryNFT_1 = require("./controller/queryNFT");
var preview_1 = require("./controller/preview");
function default_1(app) {
    // #swagger.ignore = true
    app.get('/', function (_req, res) {
        res.send('Well done mate To see more go to "/docs"!');
    });
    app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId', dgnsMetadata_1.dgnsMetadata);
    app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId/image', dgnsImage_1.dgnsImage);
    app.get('/:networkName/:contractAddress(0x[a-fA-F0-9]{40})/:tokenId/rasterize', dgnsRasterize_1.dgnsRasterize);
    app.get('/:networkName/avatar/:name/meta', avatarMetadata_1.avatarMetadata);
    app.get('/:networkName/avatar/:name', avatarImage_1.avatarImage);
    app.get('/queryNFT', queryNFT_1.queryNFTep);
    app.get('/preview/:name', preview_1.preview);
}
exports.default = default_1;
