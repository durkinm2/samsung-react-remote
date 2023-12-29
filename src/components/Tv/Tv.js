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

const TV = () => {
    const { tvId } = useParams();
    const sendCommand = (command) => {
        console.log(`Sending command "${command}" to TV${tvId}`);
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-primary btn-block btn-power">
                                <FiPower className="custom-icon-row1"/>
                            </button>
                            <div className="btn-group">
                                <button className="btn btn-secondary">
                                    <FiCrosshair className="custom-icon-row1" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 custom-row-2">
                    <div className="card">
                        <div className="card-body">
                            {/*<h5 className="card-title">Channel Controls</h5>*/}
                            <div className="btn-group dpad-1">
                                <button className="btn btn-icon">
                                    <FiChevronUp className="custom-icon dpad-up-icon"/>
                                </button>
                            </div>
                            <div className="btn-group dpad-2">
                                <button className="btn btn-icon dpad-left">
                                    <FiChevronLeft className="custom-icon dpad-left-icon"/>
                                </button>
                                <div className="dpad-divider"/>
                                <button className="btn btn-icon dpad-right">
                                    <FiChevronRight className="custom-icon dpad-right-icon"/>
                                </button>
                            </div>
                            <div className="btn-group dpad-1">
                                <button className="btn btn-icon">
                                    <FiChevronDown className="custom-icon dpad-down-icon"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 custom-row-3">
                    <div className="card">
                        <div className="card-body">
                            <button className="btn btn-outline-dark float-start">
                                <BsFillVolumeMuteFill size={28} className=""/>
                            </button>
                            {/*<div className="btn-divider"/>*/}

                            <button className="btn btn-outline-dark float-end">
                                <AiFillHome size={28} className=" "/>
                            </button>
                            {/*<div className="btn-group">*/}
                            {/*    <button className="btn btn-outline-dark">*/}
                            {/*        <BsFillVolumeMuteFill size={28} className=" "/>*/}
                            {/*    </button>*/}
                            {/*    <button className="btn btn-outline-dark">*/}
                            {/*        <AiFillHome size={28} className=" "/>*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                            {/*<div className="btn-group">*/}
                            {/*    <button className="btn btn-outline-dark">*/}
                            {/*        <AiFillHome size={28} className=" "/>*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TV;