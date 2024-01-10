import React, {useState} from 'react';
const DPad = () => {

    return (
        <div>

            {/* D-pad */}
            <div className="flex items-center justify-center grid grid-cols-3">
                <div className="col-span-1"></div>
                <button className="p-3 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none">
                    ↑
                </button>
                <div className="col-span-1"></div>
                <button className="p-3 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none">
                    ←
                </button>
                <div className="col-span-1"></div>
                <button className="p-3 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none">
                    →
                </button>
                <div className="col-span-1"></div>
                <button className="p-3 text-xl bg-gray-700 rounded-full shadow-lg focus:outline-none">
                    ↓
                </button>
            </div>
        </div>
    );
};
export default DPad;