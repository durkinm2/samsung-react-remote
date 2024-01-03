"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoSearch = exports.APPS = exports.KEYS = exports.Samsung = void 0;
var samsung_1 = __importDefault(require("./samsung"));
var samsung_2 = require("./samsung");
Object.defineProperty(exports, "Samsung", { enumerable: true, get: function () { return __importDefault(samsung_2).default; } });
var keys_1 = require("./keys");
Object.defineProperty(exports, "KEYS", { enumerable: true, get: function () { return __importDefault(keys_1).default; } });
var apps_1 = require("./apps");
Object.defineProperty(exports, "APPS", { enumerable: true, get: function () { return __importDefault(apps_1).default; } });
var auto_search_1 = require("./auto-search");
Object.defineProperty(exports, "AutoSearch", { enumerable: true, get: function () { return __importDefault(auto_search_1).default; } });
exports.default = samsung_1.default;
