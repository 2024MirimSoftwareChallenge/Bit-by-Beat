import React, { useRef, useState } from "react";
import "./musicPlayer.css"; // CSS 파일을 import합니다.
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from "react-icons/io5";

const MusicPlayer = ({ onAddButtonClick }) => {


    const audioRef = useRef(null); // 오디오 태그 접근용 ref
    const [isPlaying, setIsPlaying] = useState(false); // 재생 상태
    const [currentTime, setCurrentTime] = useState(0); // 현재 시간
    const [duration, setDuration] = useState(0); // 오디오 길이

    // 오디오 로드 시 전체 길이 설정
    const handleLoadedMetadata = () => {
        setDuration(audioRef.current.duration);
    };

    // 오디오의 현재 재생 시간 업데이트
    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current.currentTime);
    };

    // 재생 / 일시정지 버튼 클릭
    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    // 진행도 계산 (퍼센트)
    const progressPercent = (currentTime / duration) * 100;


    return (
        <div className="card">
            <div className="image-container">
                <button className="add-button" onClick={onAddButtonClick}>+</button>
            </div>
            <div className="player-content">
                <p className="title">오늘 기록하기</p>
                <p className="subtitle">오늘 하루는 어땠나요?</p>
                <div className="audio-controls">
                    <span
                        className="time">{Math.floor(currentTime / 60)}:{("0" + Math.floor(currentTime % 60)).slice(-2)}</span>
                    <div className="progress-bar">
                        <div
                            className="progress"
                            style={{width: `${progressPercent}%`}}
                        ></div>
                    </div>
                    <span
                        className="time">{Math.floor(duration / 60)}:{("0" + Math.floor(duration % 60)).slice(-2)}</span>
                </div>
                <div className="controls">
                    <button><IoPlayBack size="26" color="#ffffff"/></button>
                    <button onClick={togglePlay}>
                        {isPlaying ? <IoPause size="32" color="#ffffff"/> : <IoPlay size="32" color="#ffffff"/>}
                    </button>
                    <button><IoPlayForward size="26" color="#ffffff"/></button>
                </div>
            </div>
            <audio
                ref={audioRef}
                // src="audioURL.mp3"
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
            ></audio>
        </div>
    );
};

export default MusicPlayer;
