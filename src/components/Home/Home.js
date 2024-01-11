import React, {useState, useEffect, useRef} from 'react';
import './Home.css';
import '../Tv/Tv.css'
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
        <div className="container mx-auto home-container">
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
                                    <button
                                        className={`flex flex-1 bg-gray-700 p-3 rounded-l-md text-white items-center justify-center focus:outline-none 
                                        ${  tv.isOn ? 'bg-gradient-to-tr from-cyan-500/90 from-0% via-sky-600/95 via-80% to-blue-500/80 to-100%' : 'bg-gray-700 disabled'
                                        }`}
                                        style={{ width: '75%' }}
                                        disabled={!tv.isOn}
                                        onClick={() => navigate(`/tv/${tv.id}`)}
                                    >
                                        <div className="flex items-center justify-center mr-4">
                                            <LuMonitorSmartphone className="w-6 h-6 flex-shrink-0" />
                                            <span className="text-center ml-8">{`TV ${tv.id}`}</span>
                                        </div>
                                    </button>
                                    <button
                                        className="flex-none w-40 bg-red-500 p-3 rounded-r-md text-white flex items-center justify-center focus:outline-none"
                                        style={{ width: '25%' }}
                                    >
                                        <FiPower />
                                    </button>
                                </div>
                            </div>
                            // <div className="btn-group btn-row" key={tv.id}>
                            //     <button
                            //         className={`btn btn-tv-main ${!tv.isOn && 'disabled'}`}
                            //         disabled={!tv.isOn}
                            //         onClick={() => navigate(`/tv/${tv.id}`)}
                            //     >
                            //         <LuMonitorSmartphone className="btn-tv-icon" />
                            //         <span className="btn-tv-text">{`TV ${tv.id}`}</span>
                            //     </button>
                            //     <button
                            //         className="btn btn-power-main"
                            //         onClick={() => handlePowerToggle(tv.id)}
                            //     >
                            //         <FiPower className="custom-icon-row1" />
                            //     </button>
                            // </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default Home;
