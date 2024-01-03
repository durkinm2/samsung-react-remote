import React from 'react';
import { useParams } from 'react-router-dom';
import {
    FiChevronDown,
    FiChevronLeft,
    FiChevronRight,
    FiChevronUp,
    FiCrosshair,
    FiPower,
    FiSettings
} from "react-icons/fi";
import './Tv.css';
import {BsFillVolumeMuteFill} from "react-icons/bs";
import {AiFillHome} from "react-icons/ai";
import {MdInput} from "react-icons/md";
// import { useSamsungAPI } from '../../contexts/SamsungAPIContext';
// import {KEYS} from "samsung-tv-control";

const TV = () => {
    const { tvId } = useParams();

    // const { getApiInstance } = useSamsungAPI();
    // const samsungApi = getApiInstance(tvId);

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

    const handleButtonClick = async () => {
        try {
            // const updatedTVs = tvs.map((tv) =>
            //     tv.id === tvId ? { ...tv, isOn: !tv.isOn } : tv
            // );
            let tvId = 1;
            const response = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_DB_PORT}/tvs/${tvId}/mute`);

            if (!response.ok) {
                throw new Error('Failed to update TV configuration');
            }

            // setTVs(updatedTVs);
        } catch (error) {
            console.error('Error updating TV configuration:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="tv-container d-grid gap-1">

                <div className="col-md-4 custom-row-1">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-outline-light float-start" onClick={() => sendCommand('KEY_POWER')}>
                                <FiPower size={28} className=""/>
                            </button>
                            {/*<div className="btn-divider"/>*/}
                            <button className="btn btn-outline-light float-end" onClick={() => sendCommand('KEY_INPUT')}>
                                <MdInput size={28} className=" "/>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 custom-row-2">
                    <div className="card">
                        <div className="card-body">
                            {/*<h5 className="card-title">Channel Controls</h5>*/}
                            <div className="btn-group dpad-1">
                                <button className="btn btn-icon" onClick={() => sendCommand('KEY_UP')}>
                                    <FiChevronUp className="custom-icon dpad-up-icon"/>
                                </button>
                            </div>
                            <div className="btn-group dpad-2">
                                <button className="btn btn-icon dpad-left" onClick={() => sendCommand('KEY_LEFT')}>
                                    <FiChevronLeft className="custom-icon dpad-left-icon"/>
                                </button>
                                <div className="dpad-divider"/>
                                <button className="btn btn-icon dpad-right" onClick={() => sendCommand('KEY_RIGHT')}>
                                    <FiChevronRight className="custom-icon dpad-right-icon"/>
                                </button>
                            </div>
                            <div className="btn-group dpad-1">
                                <button className="btn btn-icon" onClick={() => sendCommand('KEY_DOWN')}>
                                    <FiChevronDown className="custom-icon dpad-down-icon"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 custom-row-3">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-outline-light float-start" onClick={handleButtonClick}>
                                <BsFillVolumeMuteFill size={28} className=""/>
                            </button>
                            {/*<div className="btn-divider"/>*/}

                            <button className="btn btn-outline-light float-end" onClick={() => sendCommand('KEY_HOME')}>
                                <AiFillHome size={28} className=" "/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TV;
