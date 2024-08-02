import React, { useState, useEffect } from 'react';
import './style.css';

const LiveStream = ({ camera }) => {
    const [recordingUrl, setRecordingUrl] = useState('');

    useEffect(() => {
        const fetchRecordingData = async () => {
            try {
                const recordingResponse = await fetch(`http://127.0.0.1:8000/api/v1/camera-info-recording/${camera.id}/`);
                const recordingData = await recordingResponse.json();
                
                const { recording_start } = recordingData;

                const streamResponse = await fetch(`http://127.0.0.1:8000/api/v1/camera-info-recording-stream/${camera.id}/?start=${recording_start}`);
                const streamData = await streamResponse.json();
                
                const { url } = streamData;
                setRecordingUrl(url);
            } catch (error) {
                console.log('Erro ao buscar dados de gravação:', error);
            }
        };

        fetchRecordingData();
    }, [camera.id]);

    const mp4Stream = camera.streams.find(stream => stream.format === 'mp4');
    const mjpegStream = camera.streams.find(stream => stream.format === 'mjpeg');

    return (
        <div className="live-stream-container">
            <h3 className="camera-list-container-h3">{camera.name}</h3>
            {mp4Stream ? (
                    <div className="live-video">
                        <p className="camera-list-container-p">Live Video:</p>
                        <video
                            src={mp4Stream.url}
                            controls
                            autoPlay
                            className="video-player"
                        >
                        </video>
                    </div>
                ) : (
                    <img
                        src={mjpegStream.url}
                        alt="Live Snapshot"
                        className="live-snapshot"
                    />
                )
            }
            {recordingUrl &&
                <div className="recording-video">
                    <p className="camera-list-container-p">Recorded Video:</p>
                    <video
                        src={recordingUrl}
                        controls
                        className="video-player-stream"
                    />
                </div>
            }
        </div>
    );
};

export default LiveStream;
