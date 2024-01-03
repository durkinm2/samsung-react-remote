import {createContext, useContext, useEffect, useState} from 'react';
// import Samsung from "samsung-tv-control";
// import { Samsung, KEYS, APPS, AutoSearch } from '../lib/samsung-api';

const SamsungAPIContext = createContext();

export const SamsungAPIProvider = ({ children }) => {
    const [apiInstances, setApiInstances] = useState({});

    // useEffect(() => {
    //     const fetchTVs = async () => {
    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_HOST}:${process.env.REACT_APP_DB_PORT}/tvs`);
    //             const data = await response.json();
    //             setTVs(data);
    //         } catch (error) {
    //             console.error('Error fetching TV data:', error);
    //         }
    //     };
    //
    //     fetchTVs();
    // }, []);
    // let config = {
    //     id: 0,
    //     debug: true,
    //     ip: process.env.TEST_IP,
    //     mac: process.env.TEST_MAC,
    //     nameApp: process.env.APP_NAME,
    //     port: 8002,
    //     token: '91199759',
    // };

    const getApiInstance = (tvNumber) => {
        // Check if an instance already exists
        if (!apiInstances[tvNumber]) {
            let config = {
                id: tvNumber,
                debug: true,
                ip: process.env.TEST_IP,
                mac: process.env.TEST_MAC,
                nameApp: process.env.APP_NAME,
                port: 8002,
                token: '91199759',
            };
            // Create a new instance of the Samsung API
            // const newApiInstance = createSamsungAPIInstance(tvNumber);
            // this.config.id = tvNumber;
        //     const newApiInstance = new Samsung(config);
        //
        //
        //     // Save the instance in the contexts state
        //     setApiInstances((prevInstances) => ({
        //         ...prevInstances,
        //         [tvNumber]: newApiInstance,
        //     }));
        }
        //
        // // Return the instance
        // return apiInstances[tvNumber];
    };

    return (
        <SamsungAPIContext.Provider value={{ getApiInstance }}>
            {children}
        </SamsungAPIContext.Provider>
    );
};

export const useSamsungAPI = () => {
    return useContext(SamsungAPIContext);
};
