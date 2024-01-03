const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 8001;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
