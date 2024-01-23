import React, {useRef, useState} from 'react';
import {FiChevronDown, FiChevronUp, FiHome, FiMinus, FiPlus, FiPower} from "react-icons/fi";
import {MdInput} from "react-icons/md";
import {BsFillVolumeMuteFill} from "react-icons/bs";
import {TbNumbers} from "react-icons/tb";
import './Remote.css';
import DPad from "../DPad/DPad";
import {IoIosArrowRoundBack} from "react-icons/io";
import {useParams} from "react-router-dom";
const Remote = ({ onDirectionClick }) => {
    const [showDigitButtons, setShowDigitButtons] = useState(false);
    const [marginTop, setMarginTop] = useState('0');
    const [marginBottom, setMarginBottom] = useState('0');
    const { tvId } = useParams();

    const digitButtonsRef = useRef(null);

    const handleTransitionEnd = () => {
        if (!showDigitButtons) {
            setMarginTop('0');
            setMarginBottom('0');
        }
    };

    const toggleDigitButtons = () => {
        setShowDigitButtons((prev) => !prev);
        setMarginTop('10px');
        setMarginBottom('24px');
    };

    const digitButtonsStyle = {
        maxHeight: showDigitButtons ? `700px` : '0',
        overflow: 'hidden',
        transition: 'max-height 0.3s ease-in-out',
        marginTop: marginTop,
        marginBottom: marginBottom,
        transform: 'active:scale-90 transition-transform'
    };

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
        <div className="flex flex-col items-center justify-start h-screen remote-container">
            <div className="w-80 bg-gray-800 p-4 rounded-lg shadow-lg mt-8 text-white">
                {/* ROW1 */}
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-red-500 rounded-md shadow-lg flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_POWER')}>
                            <FiPower className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <div className="col-span-1"></div>

                        <button className="input-button p-3 bg-gradient-to-r from-blue-600/75 to-violet-600/80 rounded-md shadow-lg flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_INPUT')}>
                            <MdInput className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>
                </div>

                {/* ROW2 */}
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4 mb-2 mt-4">
                        <button className="p-1 bg-slate-800 rounded-md shadow-lg flex items-center justify-center focus:outline-none active:bg-violet-900 transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_RETURN')}>
                            <IoIosArrowRoundBack className="w-9 h-9 flex-shrink-0"/>
                        </button>
                        <div className="col-span-1"></div>

                        <button
                            className={`toggle-button p-1 rounded-md shadow-lg text-white flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform ${
                                showDigitButtons ? 'active' : 'bg-gray-700'
                            }`}
                            onClick={toggleDigitButtons} >
                            <TbNumbers className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-4">

                {/* ROW3 */}
                    <div style={digitButtonsStyle} className="digit-buttons"
                         ref={digitButtonsRef}
                         onTransitionEnd={handleTransitionEnd}
                    >

                        <div className="grid grid-cols-3 gap-4">
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_1')}>
                                1
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_2')}>

                            2
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_3')}>
                            3
                            </button>

                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_4')}>
                            4
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_5')}>
                            5
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_6')}>
                            6
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_7')}>
                            7
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_8')}>
                            8
                            </button>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_9')}>
                            9
                            </button>
                            <div className="col-span-1"></div>
                            <button className="p-3 bg-gray-700 rounded-md shadow-lg focus:outline-none transform active:scale-90 transition-transform"
                                    onClick={() => sendCommand('KEY_0')}>
                            0
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4">

                {/* ROW4 */}
                <DPad></DPad>

                {/* ROW5 */}

                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-700 rounded-md flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_VOLUP')}>
                            <FiPlus  className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-slate-800 home-button rounded-md flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_HOME')}>
                            <FiHome  className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_CHUP')}>
                            <FiChevronUp className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>

                {/* ROW6 */}

                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-700 rounded-md flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_VOLDOWN')}>
                            <FiMinus className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_MUTE')}>
                            <BsFillVolumeMuteFill className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md flex items-center justify-center focus:outline-none transform active:scale-90 transition-transform"
                                onClick={() => sendCommand('KEY_CHDOWN')}>
                            <FiChevronDown className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Remote;
