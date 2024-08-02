import React, { useState } from 'react';
import CameraList from './components/CameraList/index';
import LiveStream from './components/LiveStream/index';
import './App.css';

const App = () => {
    const [selectedCamera, setSelectedCamera] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    const fetchUserInfo = async () => {
        if (showDropdown) {
            setShowDropdown(false);
            return;
        }
        try {
            const response = await fetch('http://localhost:8000/api/v1/user-info/'); 
            if (response.ok) {
                const data = await response.json();
                setUserInfo(data);
                setShowDropdown(true);
            } else {
                console.error('Failed to fetch user info');
            }
        } catch (error) {
            console.error('Error fetching user info:', error);
        }
    };

    return (
        <div className="app-container">
            <h2 className="header">Camera Recordings - <span style={{ color: "#00087c" }}>Angelcam</span></h2>
            <div className='user-info' onClick={fetchUserInfo}>
                <i className="ri-user-fill"></i>
            </div>
            {showDropdown && userInfo && (
                <div className="user-dropdown">
                    <p>Name: {userInfo.first_name} {userInfo.last_name}</p>
                    <p>E-mail: {userInfo.email}</p>
                    <p>Shared Cameras: {userInfo.shared_cameras_count}</p>
                </div>
            )}
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
