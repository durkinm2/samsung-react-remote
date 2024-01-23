import React, { useState, useEffect, Suspense } from 'react';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import Remote from './components/Remote/Remote';

import Settings from './components/Settings/Settings';
// import { SamsungAPIProvider } from './contexts/SamsungAPIContext';
function MainApp() {

    return (
        <div className="MainApp">
            <main className="main">
                    <div>
                        {/*<SamsungAPIProvider>*/}
                            <NavBar />
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/tv/:tvId" element={<Remote />} />
                                <Route path="/settings" element={<Settings />} />
                            </Routes>
                        {/*</SamsungAPIProvider>*/}
                    </div>
            </main>
        </div>
    );
}

export default MainApp;
