import React, {useState, useEffect, useRef} from 'react';
import './Home.css';
import {FiPower} from "react-icons/fi";

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

function Home() {
    const [data, setData] = useState(null);
    const mainContainerRef = useRef(null);

    return  (
        <div className="container home-container">
            {/*<div className="btn-row" role="group" aria-label="Basic example">*/}
            {/*    <button className="button btn-tv-main">TV 1</button>*/}
            {/*    <button className="button btn-power-main">*/}
            {/*        <FiPower className="custom-icon-row1"/>*/}
            {/*    </button>*/}
            {/*</div>*/}
            <div className="btn-group btn-row">
                <button className="btn btn-tv-main">TV 1</button>
                <button className="btn btn-power-main">
                    <FiPower className="custom-icon-row1"/>
                </button>
            </div>
            <div className="btn-group btn-row">
                <button className="btn btn-tv-main">TV 2</button>
                <button className="btn btn-power-main">
                    <FiPower className="custom-icon-row1"/>
                </button>
            </div>
            <div className="btn-group btn-row">
                <button className="btn btn-tv-main">TV 3</button>
                <button className="btn btn-power-main">
                    <FiPower className="custom-icon-row1"/>
                </button>
            </div>
        </div>
    );
}

export default Home;
