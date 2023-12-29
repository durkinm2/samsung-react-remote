import React, { useState } from 'react';

const Settings = () => {
    const [selectedOption, setSelectedOption] = useState('Option 1');
    const [ipAddress, setIpAddress] = useState('');
    const [macAddress, setMacAddress] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleIpChange = (event) => {
        setIpAddress(event.target.value);
    };

    const handleMacChange = (event) => {
        setMacAddress(event.target.value);
    };

    return (
        <div>
            <h2>Settings</h2>
            <label>
                Select an option:
                <select value={selectedOption} onChange={handleOptionChange}>
                    <option value="Option 1">Option 1</option>
                    <option value="Option 2">Option 2</option>
                    <option value="Option 3">Option 3</option>
                </select>
            </label>
            <br />
            <label>
                Enter IP Address:
                <input type="text" value={ipAddress} onChange={handleIpChange} />
            </label>
            <br />
            <label>
                Enter MAC Address:
                <input type="text" value={macAddress} onChange={handleMacChange} />
            </label>
            <br />
            <p>
                Selected Option: {selectedOption}
                <br />
                Entered IP Address: {ipAddress}
                <br />
                Entered MAC Address: {macAddress}
            </p>
        </div>
    );
};

export default Settings;
