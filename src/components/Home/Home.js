import React, {useState, useEffect, useRef} from 'react';
import './Home.css';
import {FiPower} from "react-icons/fi";
import {LuMonitorSmartphone} from "react-icons/lu";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';

const styles = {
    nameStyle: {
        fontSize: '5em',
    },
    inlineChild: {
        display: 'inline-block',
    },
    mainContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};
const Home = () => {
    const [tvs, setTVs] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchTVs = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_DB_PORT}/tvs`);
                const data = await response.json();
                setTVs(data);
            } catch (error) {
                console.error('Error fetching TV data:', error);
            }
        };

        fetchTVs();
    }, []);

    const handlePowerToggle = async (tvId) => {
        try {
            const updatedTVs = tvs.map((tv) =>
                tv.id === tvId ? { ...tv, isOn: !tv.isOn } : tv
            );

            const response = await fetch(
                `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_DB_PORT}/tvs/${tvId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        isOn: !tvs.find((tv) => tv.id === tvId).isOn,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update TV configuration');
            }

            setTVs(updatedTVs);
        } catch (error) {
            console.error('Error updating TV configuration:', error);
        }
    };

    return  (
        <div>

            <div className="container mx-auto home-container">
                <h2 className="home-header text-white text-left mt-6 ml-2">Home</h2>

                <div className="card">
                <div className="card-header ">
                    <div className="flex justify-between mt-1">
                    <h5>Screens</h5>
                    <h7 className=""><b>{tvs.length} </b> Devices</h7>
                    </div>

                </div>
                <div className="card-body grid gap-4">
                    {tvs &&
                        tvs.map((tv) => (
                            <div className="flex flex-col gap-4" key={tv.id}>
                                <div className="flex">
                                    {/*bg-gradient-to-r from-sky-500 from-100% to-blue-500/80*/}
                                    <button
                                        className={`flex flex-1 bg-gray-700 p-3 rounded-l-md text-white items-center justify-center focus:outline-none 
                                        ${  tv.isOn ? 'bg-sky-400' : 'bg-gray-700 disabled'
                                        }`}
                                        style={{ width: '75%' }}
                                        disabled={!tv.isOn}
                                        onClick={() => navigate(`/tv/${tv.id}`)}
                                    >
                                        <div className="flex items-center justify-center mr-4 flex-shrink-0 w-40">
                                            <LuMonitorSmartphone className="w-10 h-6 flex-shrink-0" />
                                            <span className="text-center w-32 flex-shrink-0">{`TV ${tv.id} `}</span>
                                            <span
                                                  className={`w-7 ${  tv.isOn ? 'text-cyan-300' : 'text-gray-500'} flex-shrink-0  text-center text-sm`}>{`${  tv.isOn ? 'ON' : 'OFF'}`}
                                            </span>
                                        </div>
                                    </button>
                                    <button
                                        className={`flex-none w-40 bg-red-500 p-3 rounded-r-md text-white flex items-center justify-center focus:outline-none`}
                                        style={{ width: '25%' }}
                                        onClick={() => handlePowerToggle(tv.id)}
                                    >
                                        <FiPower className={`${  tv.isOn ? 'text-gray-200/95' : 'text-light'}`}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Home;
