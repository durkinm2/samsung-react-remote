const {KEYS, APPS, Samsung} = require("samsung-tv-control");
const wol = require('wol');
const WebSocket = require('ws');
class SamsungApi {

    constructor(c) {
        console.info('SAMSUNG TV SERVICE CREATED');

        this.control = new Samsung(c);
        // this.control
        //     .isAvailable()
        //     .then(() => {
        //         // Get token for API
        //         this.control.getToken((token) => {
        //             console.info('# Response getToken:', token)
        //         })
        //
        //
        //     })
        //     .catch((e) => console.error(e))
        // this.init();
        //this.control = new Samsung(this.config);
    }

    sendCommand(k) {
        // Send key to TV
        this.control.sendKey(KEYS[k], function (err, res) {
            if (err) {
                throw new Error(err);
            } else {
                console.log(res);
            }
        });
    }

    openApplication(appName) {
        this.control
            .isAvailable()
            .then(() => {
                // this.control.getAppsFromTV((err, res) => {
                //     if (!err) {
                //         console.log('# Response getAppsFromTV', res)
                //     }
                // });
                this.control.openApp(APPS.Netflix, (err, res) => {
                    if (!err) {
                        console.log('# Response openApp', res)
                    }
                });
            })
    }

    powerOn() {

        return new Promise((resolve, reject) => {
            wol.wake(process.env.TEST_MAC, function(err, res) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(res);
                    resolve(res);
                }
            });
        });
    }

    powerOff() {
        console.log('powering off...');
        this.sendCommand("KEY_POWER");
    }
}

module.exports = SamsungApi;