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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var child_process_1 = require("child_process");
var fs = __importStar(require("fs"));
var net = __importStar(require("net"));
var path = __importStar(require("path"));
var request = __importStar(require("request"));
var wol = __importStar(require("wake_on_lan"));
var ws_1 = __importDefault(require("ws"));
var keys_1 = require("./keys");
var logger_1 = __importDefault(require("./logger"));
var helpers_1 = require("./helpers");
var Samsung = /** @class */ (function () {
    function Samsung(config) {
        this.TOKEN_FILE = path.join(__dirname, 'token.txt');
        if (!config.ip) {
            throw new Error('You must provide IP in config');
        }
        if (!config.mac) {
            throw new Error('You must provide MAC in config');
        }
        this.IP = config.ip;
        this.MAC = config.mac;
        this.PORT = Number(config.port) || 8002;
        this.TOKEN = config.token || '';
        this.NAME_APP = Buffer.from(config.nameApp || 'NodeJS Remote').toString('base64');
        this.SAVE_TOKEN = config.saveToken || false;
        // legacy 55000
        this.APP_STRING = config.appString || 'iphone..iapp.samsung';
        this.TV_APP_STRING = config.tvAppString || 'iphone.UE40NU7400.iapp.samsung';
        this.LOGGER = new logger_1.default({ DEBUG_MODE: !!config.debug });
        this.LOGGER.log('config', config, 'constructor');
        if (this.SAVE_TOKEN) {
            this.TOKEN = this._getTokenFromFile() || '';
        }
        this.WS_URL = this._getWSUrl();
        this.LOGGER.log('internal config', {
            IP: this.IP,
            MAC: this.MAC,
            NAME_APP: this.NAME_APP,
            PORT: this.PORT,
            SAVE_TOKEN: this.SAVE_TOKEN,
            TOKEN: this.TOKEN,
            WS_URL: this.WS_URL,
        }, 'constructor');
    }
    Samsung.prototype.getToken = function (done) {
        var _this = this;
        this.LOGGER.log('getToken', '');
        if (this.SAVE_TOKEN && this.TOKEN !== 'null' && this.TOKEN !== '') {
            done(this.TOKEN);
            return;
        }
        this.sendKey(keys_1.KEYS.KEY_HOME, function (err, res) {
            if (err) {
                _this.LOGGER.error('after sendKey', err, 'getToken');
                throw new Error('Error send Key');
            }
            var token = (res && typeof res !== 'string' && res.data && res.data.token && res.data.token) || null;
            if (token !== null) {
                var sToken = String(token);
                _this.LOGGER.log('got token', sToken, 'getToken');
                _this.TOKEN = sToken;
                _this.WS_URL = _this._getWSUrl();
                if (_this.SAVE_TOKEN) {
                    _this._saveTokenToFile(sToken);
                }
                done(sToken);
                return;
            }
            done(null);
        });
    };
    Samsung.prototype.getTokenPromise = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.getToken(function (token) {
                if (token) {
                    resolve(token);
                }
                else {
                    reject(new Error('Did not receive token from Samsung TV'));
                }
            });
        });
    };
    Samsung.prototype.setToken = function (token) {
        this.TOKEN = token;
        this.WS_URL = this._getWSUrl();
    };
    Samsung.prototype.sendKey = function (key, done) {
        this.LOGGER.log('send key', key, 'sendKey');
        if (this.PORT === 55000) {
            this._sendLegacy(key, done);
        }
        else {
            this._send((0, helpers_1.getCommandByKey)(key), done, 'ms.channel.connect');
        }
    };
    Samsung.prototype.sendKeyPromise = function (key) {
        this.LOGGER.log('send key', key, 'sendKeyPromise');
        if (this.PORT === 55000) {
            return this._sendLegacyPromise(key);
        }
        else {
            return this._sendPromise((0, helpers_1.getCommandByKey)(key), 'ms.channel.connect');
        }
    };
    Samsung.prototype.sendText = function (text, done) {
        this.LOGGER.log('send text', text, 'sendText');
        if (this.PORT === 55000) {
            this.LOGGER.error('send text not supported in legacy api', 'send text not supported', 'send text error');
            return false;
        }
        else {
            this._send((0, helpers_1.getSendTextCommand)(text), done, 'ms.channel.connect');
        }
    };
    Samsung.prototype.sendTextPromise = function (text) {
        this.LOGGER.log('send text', text, 'sendTextPromise');
        if (this.PORT === 55000) {
            this.LOGGER.error('send text not supported in legacy api', 'send text not supported', 'send text error');
            return false;
        }
        else {
            return this._sendPromise((0, helpers_1.getSendTextCommand)(text), 'ms.channel.connect');
        }
    };
    Samsung.prototype.getAppsFromTV = function (done) {
        return this._send((0, helpers_1.getMsgInstalledApp)(), done);
    };
    Samsung.prototype.getAppsFromTVPromise = function () {
        return this._sendPromise((0, helpers_1.getMsgInstalledApp)());
    };
    Samsung.prototype.getAppIcon = function (iconPath, done) {
        return this._send((0, helpers_1.getMsgAppIcon)(iconPath), done);
    };
    Samsung.prototype.getAppIconPromise = function (iconPath) {
        return this._sendPromise((0, helpers_1.getMsgAppIcon)(iconPath));
    };
    Samsung.prototype.openAppByAppIdAndType = function (appId, type, done) {
        this._send((0, helpers_1.getMsgLaunchApp)({ app_type: type, appId: appId, icon: '', is_lock: 0, name: '' }), done);
    };
    Samsung.prototype.openAppByAppIdAndTypePromise = function (appId, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.openAppByAppIdAndType(appId, type, function (err, res) {
                if (err) {
                    reject(err);
                }
                resolve(res);
            });
        });
    };
    Samsung.prototype.openApp = function (appId, done) {
        var _this = this;
        this.getAppsFromTV(function (err, res) {
            _this.LOGGER.error('getAppsFromTV error', String(err), 'openApp getAppsFromTV');
            if (err ||
                (res && typeof res !== 'string' && res.data && res.data.data && res.data.data === undefined)) {
                _this.LOGGER.error('getAppsFromTV error', String(err), 'openApp getAppsFromTV');
                return false;
            }
            var apps = res && typeof res !== 'string' && res.data && res.data.data ? res.data.data : [];
            var app = apps.find(function (appIter) { return appIter.appId === appId; });
            if (!app) {
                _this.LOGGER.error('This APP is not installed', { appId: appId, app: app }, 'openApp getAppsFromTV');
                if (done) {
                    done(new Error('This APP is not installed'), null);
                }
            }
            else {
                _this._send((0, helpers_1.getMsgLaunchApp)(app), done);
            }
        });
    };
    Samsung.prototype.openAppPromise = function (appId) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.openApp(appId, function (err, res) {
                            if (!err) {
                                resolve(res);
                            }
                            else {
                                reject(err);
                            }
                        });
                    })];
            });
        });
    };
    Samsung.prototype.openYouTubeLink = function (url) {
        var _this = this;
        var videoId = (0, helpers_1.getVideoId)(url);
        if (!videoId) {
            return false;
        }
        this.LOGGER.log('videoId', { videoId: videoId }, 'openYouTubeLink');
        return new Promise(function (resolve, reject) {
            request.post('http://' + _this.IP + ':8080/ws/apps/YouTube', {
                headers: {
                    'Content-Type': 'text/plain',
                    'Content-Length': Buffer.byteLength(videoId),
                },
                timeout: 10000,
                body: videoId,
            }, function (err, response) {
                if (!err) {
                    _this.LOGGER.log('Link sent', { status: response.statusCode, body: response.body, headers: response.headers }, 'openYouTubeLink');
                    resolve('Link sent');
                }
                else {
                    _this.LOGGER.error('While send a link, somthing went wrong', { err: err }, 'openYouTubeLink');
                    reject(err);
                }
            });
        });
    };
    Samsung.prototype.isAvailable = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            request.get({ url: "http://".concat(_this.IP, ":8001").concat(_this.PORT === 55000 ? '/ms/1.0/' : '/api/v2/'), timeout: 3000 }, function (err, res) {
                if (err) {
                    return reject(err);
                }
                if (!err && res.statusCode === 200) {
                    _this.LOGGER.log('TV is available', { request: res.request, body: res.body, code: res.statusCode }, 'isAvailable');
                    resolve(true);
                }
                else {
                    _this.LOGGER.error('TV is not available', { err: err }, 'isAvailable');
                    resolve(false);
                }
            });
        });
    };
    Samsung.prototype.isAvailablePing = function () {
        var _this = this;
        return new Promise(function (resolve) {
            (0, child_process_1.exec)('ping -c 1 -W 1 ' + _this.IP, function (error, stdout, _) {
                if (error) {
                    _this.LOGGER.error('TV is not available', { error: error }, 'isAvailable');
                    // Do not reject since we're testing for the TV to be available
                    resolve(false);
                }
                else {
                    _this.LOGGER.log('TV is available', { stdout: stdout }, 'isAvailable');
                    resolve(true);
                }
            });
        });
    };
    Samsung.prototype.turnOn = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            wol.wake(_this.MAC, { num_packets: 30 }, function (err) {
                if (err) {
                    _this.LOGGER.error('Fail turn on', err, 'turnOn');
                    reject(err);
                }
                else {
                    _this.LOGGER.log('WOL sent command to TV', '', 'turnOn');
                    resolve(true);
                }
            });
        });
    };
    Samsung.prototype.getLogs = function () {
        this.LOGGER.saveLogToFile();
    };
    /**
     * If you don't need to keep connection, you can to close immediately
     */
    Samsung.prototype.closeConnection = function () {
        // backward compatibility
    };
    Samsung.prototype._send = function (command, done, eventHandle) {
        var _this = this;
        var ws = new ws_1.default(this.WS_URL, { rejectUnauthorized: false });
        this.LOGGER.log('command', command, '_send');
        this.LOGGER.log('wsUrl', this.WS_URL, '_send');
        ws.on('open', function () {
            if (_this.PORT === 8001) {
                setTimeout(function () { return ws.send(JSON.stringify(command)); }, 1000);
            }
            else {
                ws.send(JSON.stringify(command));
                setTimeout(function () { return ws.close(); }, 250);
            }
        });
        ws.on('message', function (message) {
            var data = JSON.parse(message);
            _this.LOGGER.log('data: ', JSON.stringify(data, null, 2), 'ws.on message');
            if (done && (data.event === command.params.event || data.event === eventHandle)) {
                _this.LOGGER.log('if correct event', JSON.stringify(data, null, 2), 'ws.on message');
                done(null, data);
            }
            if (data.event !== 'ms.channel.connect') {
                _this.LOGGER.log('if not correct event', JSON.stringify(data, null, 2), 'ws.on message');
                ws.close();
            }
            // TODO, additional check on available instead of ws.open
            // if(data.event == "ms.channel.connect") { _sendCMD() }
        });
        ws.on('response', function (response) {
            _this.LOGGER.log('response', response, 'ws.on response');
        });
        ws.on('error', function (err) {
            var errorMsg = '';
            if (err.code === 'EHOSTUNREACH' || err.code === 'ECONNREFUSED') {
                errorMsg = 'TV is off or unavailable';
            }
            console.error(errorMsg);
            _this.LOGGER.error(errorMsg, err, 'ws.on error');
            if (done) {
                done(err, null);
            }
        });
    };
    Samsung.prototype._sendPromise = function (command, eventHandle) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._send(command, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            }, eventHandle);
        });
    };
    Samsung.prototype._sendLegacy = function (key, done) {
        var _this = this;
        if (!key) {
            this.LOGGER.error('send() missing command', { key: key });
            return;
        }
        this.LOGGER.log('send key', key, 'sendKey');
        var connection = net.connect(this.PORT, this.IP);
        connection.setTimeout(3000);
        connection.on('connect', function () {
            var payload = _this.getLegacyCommand(key);
            connection.write(payload.header);
            connection.write(payload.command);
            connection.end();
            connection.destroy();
            if (done) {
                done(null, key);
            }
        });
        connection.on('close', function () {
            _this.LOGGER.log('closed connection', {}, 'connection.on close');
        });
        connection.on('error', function (err) {
            var errorMsg = '';
            if (err.code === 'EHOSTUNREACH' || err.code === 'ECONNREFUSED') {
                errorMsg = 'Device is off or unreachable';
            }
            else {
                errorMsg = err.code;
            }
            console.error(errorMsg);
            _this.LOGGER.error(errorMsg, err, 'connection.on error');
            if (done) {
                done(err, key);
            }
        });
        connection.on('timeout', function (err) {
            console.error('timeout');
            _this.LOGGER.error('timeout', err, 'connection.on timeout');
            if (done) {
                done(err, key);
            }
        });
    };
    Samsung.prototype._sendLegacyPromise = function (key) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this._sendLegacy(key, function (err, res) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
        });
    };
    Samsung.prototype.getLegacyCommand = function (key) {
        var payload = { header: '', command: '' };
        var headerData = (0, helpers_1.chr)(0x64) +
            (0, helpers_1.chr)(0x00) +
            (0, helpers_1.chr)((0, helpers_1.base64)(this.IP).length) +
            (0, helpers_1.chr)(0x00) +
            (0, helpers_1.base64)(this.IP) +
            (0, helpers_1.chr)((0, helpers_1.base64)(this.MAC).length) +
            (0, helpers_1.chr)(0x00) +
            (0, helpers_1.base64)(this.MAC) +
            (0, helpers_1.chr)((0, helpers_1.base64)(this.NAME_APP).length) +
            (0, helpers_1.chr)(0x00) +
            (0, helpers_1.base64)(this.NAME_APP);
        payload.header =
            (0, helpers_1.chr)(0x00) +
                (0, helpers_1.chr)(this.APP_STRING.length) +
                (0, helpers_1.chr)(0x00) +
                this.APP_STRING +
                (0, helpers_1.chr)(headerData.length) +
                (0, helpers_1.chr)(0x00) +
                headerData;
        var commandData = (0, helpers_1.chr)(0x00) + (0, helpers_1.chr)(0x00) + (0, helpers_1.chr)(0x00) + (0, helpers_1.chr)((0, helpers_1.base64)(key).length) + (0, helpers_1.chr)(0x00) + (0, helpers_1.base64)(key);
        payload.command =
            (0, helpers_1.chr)(0x00) +
                (0, helpers_1.chr)(this.TV_APP_STRING.length) +
                (0, helpers_1.chr)(0x00) +
                this.TV_APP_STRING +
                (0, helpers_1.chr)(commandData.length) +
                (0, helpers_1.chr)(0x00) +
                commandData;
        return payload;
    };
    Samsung.prototype._saveTokenToFile = function (token) {
        try {
            fs.writeFileSync(this.TOKEN_FILE, token);
            console.log('Token saved!');
        }
        catch (err) {
            console.log('File error!');
            this.LOGGER.error('catch fil esave', { err: err }, '_saveTokenToFile');
        }
    };
    Samsung.prototype._getTokenFromFile = function () {
        try {
            fs.accessSync(this.TOKEN_FILE, fs.constants.F_OK);
            console.log('File suss!');
            var fileData = fs.readFileSync(this.TOKEN_FILE);
            return fileData.toString();
        }
        catch (err) {
            console.log('File error!');
            this.LOGGER.error('if (this.SAVE_TOKEN)', { err: err }, 'constructor');
            return null;
        }
    };
    Samsung.prototype._getWSUrl = function () {
        return "".concat(this.PORT === 8001 ? 'ws' : 'wss', "://").concat(this.IP, ":").concat(this.PORT, "/api/v2/channels/samsung.remote.control?name=").concat(this.NAME_APP).concat(this.TOKEN !== '' ? "&token=".concat(this.TOKEN) : '');
    };
    return Samsung;
}());
exports.default = Samsung;
