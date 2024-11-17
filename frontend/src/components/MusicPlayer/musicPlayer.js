import React, { useRef, useState, useEffect } from "react";
import "./musicPlayer.css";
import AudioController from "./audioController";

const MusicPlayer = ({ diary, onAddButtonClick }) => {
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

    useEffect(() => {
        if (audioRef.current && diary?.song?.songPath) {
            console.log("song path 인식 성공");
            audioRef.current.src = `http://localhost:8080${diary.song.songPath}`;
        }
        else{
            console.log("song path 인식 실패");

        }
    }, [diary]);

    return (
        <div className="card">
            <div className="image-container">
                {diary?.imgPath ? (
                    <img src={`${diary.imgPath}`} alt="Diary" />
                ) : (
                    <button className="add-button" onClick={onAddButtonClick}>
                        +
                    </button>
                )}
            </div>
            <div className="player-content">
                <p className="player-title">{diary?.song?.title || "오늘 기록하기"}</p>
                <p className="player-subtitle">{diary?.content || "오늘 하루는 어땠나요?"}</p>
                <AudioController
                    currentTime={currentTime}
                    duration={duration}
                    isPlaying={isPlaying}
                    onPlayPause={togglePlay}
                />
            </div>
            <audio
                ref={audioRef}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onError={(e) => console.error("Audio loading error:", e)}
            ></audio>
        </div>
    );
};

export default MusicPlayer;
