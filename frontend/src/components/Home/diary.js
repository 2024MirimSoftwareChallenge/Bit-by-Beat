import React, { useRef, useState } from 'react';
import './diary.css';
import diaryData from './diaryDataEx';
import AudioController from '../MusicPlayer/audioController';
import audioFile from "../../assets/example.mp3";


const Diary = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // 오디오 이벤트 핸들러
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
        <div className="diary">
            <div className="diary-header">
                <img src="https://cdn.crowdpic.net/detail-thumb/thumb_d_4D24F988C28882891AB7778F32CF1285.jpg"
                     alt="Cloud" className="diary-image"/>
                <div className="diary-header-text">
                    <div className="diary-title">{diaryData.title}</div>
                    <div className="diary-date">{diaryData.date}</div>
                </div>
            </div>
            <div className="diary-tag">
                {diaryData.tag.split(',').map((tag, index) => (
                    <span key={index} className="tag-item">
                    #{tag.trim()}
                    </span>
                ))}
            </div>

            <hr className="divider"/>

            <div className="diary-content">{diaryData.content.trim()}</div>

            <div className="diary-audioController">
                <AudioController
                    currentTime={currentTime}
                    duration={duration}
                    isPlaying={isPlaying}
                    onPlayPause={togglePlay}
                    iconColor="#85C7DF"
                    iconSize={{
                        control: 40,
                        skip: 30
                    }}
                    progressBarColor="#3489BB"
                    iconGap="56px"
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

export default Diary;