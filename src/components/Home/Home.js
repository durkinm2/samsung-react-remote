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
        <div className="container home-container">
            <div className="card">
                <div className="card-header">
                    <h5>Screens</h5>
                </div>
                <div className="card-body d-grid gap-4">
                    {tvs && tvs.map((tv) => (
                        <div className="btn-group btn-row" key={tv.id}>
                            <button className="btn btn-tv-main" disabled={!tv.isOn} onClick={() => navigate(`/tv/${tv.id}`)}>
                                <LuMonitorSmartphone className="btn-tv-icon" />
                                <span className="btn-tv-text">{`TV ${tv.id}`}</span>
                            </button>
                            <button className="btn btn-power-main"
                                    onClick={() => handlePowerToggle(tv.id)}>
                                <FiPower className="custom-icon-row1" />
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default Home;
