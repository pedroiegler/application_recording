import React, { useEffect, useState } from 'react';
import './style.css';
import 'remixicon/fonts/remixicon.css';

const CameraList = ({ onSelectCamera }) => {
    const [cameras, setCameras] = useState([]);

    useEffect(() => {
        const loadCameras = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/camera-info/');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setCameras(data.results || []);
            } catch (error) {
                console.log("Error: " + error);
            } 
        };
        loadCameras();
    }, []);

    return (
        <div className="camera-list-container">
            <h3>Shared <span style={{ color: "#00087c"}}>Cameras</span></h3>
            <ul>
                {cameras.length > 0 ? (
                    cameras.map(camera => (
                        <li key={camera.id} className="camera-item">
                            <img src={camera.snapshot.url} alt={camera.name} className="camera-image" />
                            <div className="camera-info">
                                <p>{camera.name}</p>
                                <button className="view-button" onClick={() => onSelectCamera(camera)}>Watch Live</button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No cameras found.</p>
                )}
            </ul>
        </div>
    );
};

export default CameraList;
