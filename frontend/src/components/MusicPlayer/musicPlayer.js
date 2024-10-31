import React from "react";
import "./musicPlayer.css"; // CSS 파일을 import합니다.

const MusicPlayer = ({ onAddButtonClick }) => {
    return (
        <div className="card">
            <div className="image-container">
                <button className="add-button" onClick={onAddButtonClick}>+</button>
            </div>
            <div className="player-content">
                <p className="title">오늘 기록하기</p>
                <p className="subtitle">오늘 하루는 어땠나요?</p>
                <div className="audio-controls">
                    <span className="time">0:00</span>
                    <div className="progress-bar">
                        <div className="progress"></div>
                    </div>
                    <span className="time">0:00</span>
                </div>
                <div className="controls">
                    <button className="control-button">⏮</button>
                    <button className="control-button">▶</button>
                    <button className="control-button">⏭</button>
                </div>
            </div>
        </div>
    );
};

export default MusicPlayer;
