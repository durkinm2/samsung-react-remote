"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var node_ssdp_1 = require("node-ssdp");
var request = __importStar(require("request"));
var SAMSUNG_TV_URN = 'urn:samsung.com:device';
var AutoSearch = /** @class */ (function () {
    function AutoSearch() {
        this.IPs = [];
        this.TVs = [];
        this.client = new node_ssdp_1.Client();
        this.client.on('response', this.deviceUpdate.bind(this));
    }
    AutoSearch.prototype.search = function (time) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.client.search('ssdp:all');
            setTimeout(_this.stopSearch.bind(_this, resolve, reject), time || 15000);
        });
    };
    AutoSearch.prototype.deviceUpdate = function (headers, _, rinfo) {
        var _this = this;
        if ((headers && headers.ST && !headers.ST.includes(SAMSUNG_TV_URN)) || this.IPs.includes(rinfo.address)) {
            return;
        }
        this.IPs.push(rinfo.address);
        // TODO Add rotation Urls
        request.get({ url: "http://".concat(rinfo.address, ":8001/api/v2/") }, function (err, res, body) {
            if (err || res.statusCode !== 200) {
                return;
            }
            var data = JSON.parse(body);
            _this.TVs.push({
                ip: data.device.ip,
                model: data.device.modelName,
                name: data.device.name,
                wifiMac: data.device.wifiMac,
            });
        });
    };
    AutoSearch.prototype.stopSearch = function (resolve) {
        this.client.stop();
        resolve(this.TVs);
    };
    return AutoSearch;
}());
exports.default = AutoSearch;
// Example
// async function main() {
//   const autoSearch = new AutoSearch()
//   const tvs = await autoSearch.search(1000)
//   console.log(tvs)
// }
// main()
