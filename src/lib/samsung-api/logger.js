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
var fs = __importStar(require("fs"));
var TypeLog;
(function (TypeLog) {
    TypeLog["ERROR"] = "ERROR";
    TypeLog["LOG"] = "LOG";
})(TypeLog || (TypeLog = {}));
var Logger = /** @class */ (function () {
    function Logger(config) {
        this.DEBUG = false;
        this.LogFile = [];
        this.DEBUG = config.DEBUG_MODE;
    }
    Logger.prototype.log = function (message, logData, funcName) {
        this._addLogItem(TypeLog.LOG, message, logData, funcName);
    };
    Logger.prototype.error = function (message, logData, funcName) {
        this._addLogItem(TypeLog.ERROR, message, logData, funcName);
    };
    Logger.prototype.saveLogToFile = function () {
        var _this = this;
        var nameOfFile = "log-".concat(new Date().toISOString(), ".txt");
        var file = fs.createWriteStream(nameOfFile);
        file.on('error', function (err) {
            console.error('ERROR: Failed to write log file!', err);
            console.error('LOG File will be output in console!');
            console.info('----- LOG ------');
            _this.LogFile.forEach(function (item) { return console.info(_this._printLog(item)); });
            console.info('-- END OF LOG --');
        });
        file.on('finish', function () {
            console.log("Wrote log to file \"".concat(nameOfFile, "\""));
        });
        this.LogFile.forEach(function (item) {
            file.write(_this._printLog(item) + '\n');
        });
        file.end();
    };
    Logger.prototype._addLogItem = function (type, message, logData, funcName) {
        if (!this.DEBUG) {
            return;
        }
        var cnsl;
        switch (type) {
            case TypeLog.ERROR:
                cnsl = console.error;
                break;
            case TypeLog.LOG:
                cnsl = console.info;
                break;
            default:
                cnsl = console.log;
                break;
        }
        this.LogFile.push({
            funcName: funcName,
            logData: logData,
            message: message,
            time: new Date().toISOString(),
            type: type,
        });
        if (funcName) {
            cnsl("# [".concat(new Date().toISOString(), "] #"));
            cnsl('FUNCTION:', funcName);
            cnsl(type, message);
            cnsl(logData);
            cnsl('### ### ###\n');
            return;
        }
        cnsl("# [".concat(new Date().toISOString(), "] #"));
        cnsl(type, message);
        cnsl(logData);
        cnsl('### ### ###\n');
    };
    Logger.prototype._printLog = function (item) {
        return "[".concat(item.time, "] ").concat(item.type).concat(item.funcName ? ' "' + item.funcName + '": ' : '', " ").concat(item.message, " - ").concat(JSON.stringify(item.logData, null, 2));
    };
    return Logger;
}());
exports.default = Logger;
