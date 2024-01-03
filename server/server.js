const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const { Samsung, KEYS, APPS } = require('samsung-tv-control')
require('dotenv').config()

const app = express();
const port = process.env.REACT_APP_DB_PORT;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

const config = {
    debug: true, // Default: false
    ip: process.env.REACT_APP_TV_L_IP,
    mac: process.env.REACT_APP_TV_L_MAC,
    nameApp: 'NodeJS-Test', // Default: NodeJS
    port: 8002, // Default: 8002
    token: process.env.REACT_APP_TOKEN,
}
const samsung = new Samsung(config);

app.get('/tvs', (req, res) => {
    const configPath = path.join(__dirname, 'config.json');
    const configData = fs.readFileSync(configPath, 'utf-8');
    const tvsData = JSON.parse(configData).tvs;
    res.json(tvsData);
});

// Update TV configuration by tvId
app.put('/tvs/:tvId', (req, res) => {
    try {
        const configPath = path.join(__dirname, 'config.json');
        const configData = fs.readFileSync(configPath, 'utf-8');
        const tvsData = JSON.parse(configData).tvs;
        const { tvId } = req.params;
        const updatedConfig = req.body;

        // Find the TV with the given tvId
        const updatedTV = tvsData.find(tv => tv.id === tvId);

        if (!updatedTV) {
            return res.status(404).json({ success: false, message: 'TV not found' });
        }

        // Update the TV configuration
        Object.assign(updatedTV, updatedConfig);

        // Update the configuration file
        const updatedConfigData = { tvs: tvsData };
        fs.writeFileSync(configPath, JSON.stringify(updatedConfigData, null, 2), 'utf-8');

        res.status(200).json({ success: true, message: 'TV configuration updated successfully' });
    } catch (error) {
        console.error('Error updating TV configuration:', error);
        res.status(500).json({ success: false, message: 'Failed to update TV configuration' });
    }
});

app.get('/tvs/:tvId/mute', (req, res) => {
   // console.info('# trying to getToken:')
    //
    // samsung
    //     .isAvailable()
    //     .then(() => {
    //         // Get token for API
    //         samsung.getToken((token) => {
    //             console.info('# Response getToken:', token)
    //         })
    //
    //
    //     })
    //     .catch(
    //         (e) => console.error("failed to get token: " + e))


    // Send key to TV
    samsung.sendKey(KEYS["KEY_MUTE"], function (err, res) {
        if (err) {
            throw new Error(err);
        } else {
            console.log(res);
        }
    });

    res.sendStatus(204);
});

app.get('/tvs/:tvId/cmd', (req, res) => {
    console.log("Log message sent to the client from /screenId/cmd key=" + req.query.key);

    // samsung.sendCommand(req.query.key);
    samsung.sendKey(KEYS[req.query.key], function (err, res) {
        if (err) {
            throw new Error(err);
        } else {
            console.log(res);
        }
    });

    res.sendStatus(204);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
