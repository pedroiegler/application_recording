import React, { useState } from 'react';
import CameraList from './components/CameraList';
import LiveStream from './components/LiveStream';
import './App.css';

const App = () => {
    const [selectedCamera, setSelectedCamera] = useState(null);

    return (
        <div className="app-container">
            <h2 className="header">Live Camera Streaming</h2>
            <div className="main-content">
                <div className="camera-list">
                    <CameraList onSelectCamera={setSelectedCamera} />
                </div>
                <div className="live-stream">
                    {selectedCamera && <LiveStream camera={selectedCamera} />}
                </div>
            </div>
        </div>
    );
};

export default App;
