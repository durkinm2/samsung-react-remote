import React from 'react';
import {FiPower} from "react-icons/fi";
import {MdInput} from "react-icons/md";

const Remote = ({ onDirectionClick }) => {
    return (
        <div className="flex justify-center items-center h-screen">

            <div className="w-80 bg-gray-800 p-4 rounded-lg shadow-lg">
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
                    <div className="grid grid-cols-2 gap-4">
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            0
                        </button>
                        <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                            Power
                        </button>
                    </div>
                </div>
                <div className="mt-4 flex justify-between">
                    <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                        Volume Up
                    </button>
                    <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                        Channel Up
                    </button>
                </div>
                <div className="mt-4 flex justify-between">
                    <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                        Volume Down
                    </button>
                    <button className="p-3 bg-gray-700 rounded-md focus:outline-none">
                        Channel Down
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Remote;
