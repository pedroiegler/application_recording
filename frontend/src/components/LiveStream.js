import React, { useState, useEffect } from 'react';
import './LiveStream.css';

const LiveStream = ({ camera }) => {
    const [search, setSearch] = useState('');

    return (
        <div className="live-stream-container">
            <h3 className="camera-list-container-h3">{camera.name}</h3>
            {camera.streams.find(stream => stream.format === 'mp4') ? (
                <div className="live-video">
                    <p className="camera-list-container-p">Live Video:</p>
                    <video
                        src={camera.streams.find(stream => stream.format === 'mp4')?.url}
                        controls
                        autoPlay
                        className="video-player"
                    >
                    </video>
                </div>
            ) : (
                <img
                    src={camera.streams.find(stream => stream.format === 'mjpeg')?.url}
                    alt="Live Snapshot"
                    className="live-snapshot"
                />
            )}
        </div>
    );
};

export default LiveStream;
