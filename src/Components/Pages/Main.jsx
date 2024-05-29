// Main.js
import React from 'react';
import Navbar from "../Navbar/Navbar";

const Main = ({ children }) => {
    
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="row align-items-center justify-content-center">
                    {children}
                </div>
            </div>
        </>
    );
};

export default Main;
