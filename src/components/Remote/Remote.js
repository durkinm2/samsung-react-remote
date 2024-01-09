import React from 'react';
import {FiChevronDown, FiChevronUp, FiMinus, FiPlus, FiPower} from "react-icons/fi";
import {MdInput} from "react-icons/md";
import {BsFillVolumeMuteFill} from "react-icons/bs";

const Remote = ({ onDirectionClick }) => {
    return (
        <div className="flex flex-col items-center justify-start h-screen">
            <div className="w-80 bg-gray-800 p-4 rounded-lg shadow-lg mt-8 text-white">
                {/* Power button */}
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-red-500 rounded-md flex items-center justify-center focus:outline-none">
                            <FiPower className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <div className="col-span-1"></div>
                        <button className="p-3 bg-red-500 rounded-md flex items-center justify-center focus:outline-none">
                            <MdInput className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            1
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            2
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            3
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            4
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            5
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            6
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            7
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            8
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            9
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-500 rounded-md flex items-center justify-center focus:outline-none">
                            <FiPlus  className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            0
                        </button>
                        <button className="p-3 bg-gray-500 rounded-md flex items-center justify-center focus:outline-none">
                            <FiChevronUp className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        <button className="p-3 bg-gray-500 rounded-md flex items-center justify-center focus:outline-none">
                            <FiMinus className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-gray-500 rounded-md flex items-center justify-center focus:outline-none">
                            <BsFillVolumeMuteFill className="w-6 h-6 flex-shrink-0" />
                        </button>
                        <button className="p-3 bg-gray-500 rounded-md flex items-center justify-center focus:outline-none">
                            <FiChevronDown className="w-6 h-6 flex-shrink-0" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Remote;
