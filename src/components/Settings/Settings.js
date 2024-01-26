import React, { useState } from 'react';
import './Settings.css';

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
        <div className="settings">
            <h2 className="text-2xl font-semibold text-light text-left ml-10">Settings</h2>
        <div style={{ border: '1px solid gray'}} className="mt-10 ml-4 mr-4 flex d-grid gap-4 bg-slate-400 bg-opacity-10 rounded-md">

            <div className="pt-8 pr-8 pb-8 pl-4 rounded shadow-md w-full sm:w-96 text-light">

                    {/* Combobox */}
                    <div className="mb-8 flex ">
                        <label className="block text-md font-medium mr-4  w-24 whitespace-pre-line">Select TV</label>
                        <select
                            className="mt-1 h-8 p-2 block w-full border text-gray-500 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        >
                            {/* Options go here */}
                        </select>
                    </div>

                    {/* IP 1 */}
                    <div className="mb-6 flex items-center">
                        <label className="block text-md font-medium mr-4 w-24">IP</label>
                        <input
                            type="text"
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* MAC 2 */}
                    <div className="mb-8 flex items-center">
                        <label className="block text-md font-medium mr-4 w-24">MAC</label>
                        <input
                            type="text"
                            className="mt-1 p-2 block w-full border rounded-md shadow-sm focus:outline-none focus:border-blue-500"
                        />
                    </div>

                    {/* Save Button */}
                    <div className="flex items-center justify-center">

                    <button
                        className="ml-20 mt-2 text-lg w-36 bg-blue-500 text-white py-2.5 rounded-md hover:bg-blue-600 focus:outline-none focus:border-blue-700"
                    >
                        Save
                    </button>
                    </div>
                </div>
        </div>
        </div>

    );
};

export default Settings;
