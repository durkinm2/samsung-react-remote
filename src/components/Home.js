import React, {useState, useEffect, useRef} from 'react';

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
            <div className="button-row" role="group" aria-label="Basic example">
                <button className="button btn-tv-main">TV 1</button>
                <button className="button btn-power-main">
                    <span className="material-icons-outlined">power_settings_new</span>
                </button>
            </div>

        </div>
    );
}

export default Home;
