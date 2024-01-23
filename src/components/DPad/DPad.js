import React, {useState} from 'react';
import './DPad.css'
import {useParams} from "react-router-dom";
import {FaRegCircle} from "react-icons/fa";
const DPad = () => {
    const { tvId } = useParams();

    const sendCommand = async (k) => {
        try {

            let tvId = 1;
            const response = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_DB_PORT}/tvs/${tvId}/cmd?key=${k}`);
            if (!response.ok) {
                throw new Error('Failed to update TV configuration');
            }
            // setTVs(updatedTVs);
        } catch (error) {
            console.error('Error updating TV configuration:', error);
        }
        console.log(`Sending command "${k}" to TV${tvId}`);
    };

    return (
        <div>

            {/* D-pad */}
            <div className="flex items-center justify-center grid grid-cols-3 dpad-container">
                <div className="col-span-1"></div>
                <button className="p-3 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none mb-3 transform active:scale-90 transition-transform"
                        onClick={() => sendCommand('KEY_UP')}>
                ↑
                </button>
                <div className="col-span-1"></div>
                <button className="p-3 mr-2 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                        onClick={() => sendCommand('KEY_LEFT')}>
                ←
                </button>
                {/*<div className="col-span-1"></div>*/}
                <button className="flex items-center justify-center p-3 size-18 bg-slate-800 rounded-full shadow-lg focus:outline-none ml-1 mr-2 transform active:scale-90 transition-transform"
                        onClick={() => sendCommand('KEY_ENTER')}>
                    OK
                </button>
                <button className="p-3 ml-2 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                        onClick={() => sendCommand('KEY_RIGHT')}>
                →
                </button>
                <div className="col-span-1"></div>
                <button className="p-3 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none mt-3 transform active:scale-90 transition-transform"
                        onClick={() => sendCommand('KEY_DOWN')}>
                ↓
                </button>
            </div>
        </div>
    );
};
export default DPad;
