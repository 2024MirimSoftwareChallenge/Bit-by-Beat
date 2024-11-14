// components/MusicPlayer.js
import React, { useRef, useState } from "react";
import "./musicPlayer.css";
import AudioController from "./audioController";
import audioFile from "../../assets/example.mp3"; // 오디오 파일 import

const MusicPlayer = ({ onAddButtonClick }) => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    const togglePlay = async () => {
        try {
            if (isPlaying) {
                await audioRef.current.pause();
            } else {
                await audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        } catch (error) {
            console.error("Audio playback error:", error);
        }
    };

    return (
        <div className="card">
            <div className="image-container">
                <button className="add-button" onClick={onAddButtonClick}>+</button>
            </div>
            <div className="player-content">
                <p className="player-title">오늘 기록하기</p>
                <p className="player-subtitle">오늘 하루는 어땠나요?</p>
                <AudioController
                    currentTime={currentTime}
                    duration={duration}
                    isPlaying={isPlaying}
                    onPlayPause={togglePlay}

                />
            </div>
            <audio
                ref={audioRef}
                src={audioFile}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onError={(e) => console.error("Audio loading error:", e)}
            ></audio>
        </div>
    );
};

export default MusicPlayer;