import React, { useState, useEffect, Suspense } from 'react';
import Home from './components/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/Navbar/Navbar';
import TV from './components/Tv/Tv';
import Settings from './components/Settings';
function MainApp() {

    return (
        <div className="MainApp">
            <main className="main">
                    <div>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/tv/:tvId" element={<TV />} />
                            <Route path="/settings" element={<Settings />} />
                        </Routes>
                    </div>
            </main>


        </div>
    );
}

export default MainApp;