import {createContext, useContext, useEffect, useState} from 'react';

const SamsungAPIContext = createContext();

export const SamsungAPIProvider = ({ children }) => {
    const [apiInstances, setApiInstances] = useState({});

    const getApiInstance = (tvNumber) => {
        // Check if an instance already exists
        if (!apiInstances[tvNumber]) {

        }
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
