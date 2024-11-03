import React from "react";
import { IoPlay, IoPause, IoPlayBack, IoPlayForward } from "react-icons/io5";
import "./audioController.css";

const AudioController = ({
                             currentTime,
                             duration,
                             isPlaying,
                             onPlayPause,
                             iconColor = "#ffffff",
                             iconSize = {
                                 control: 32,
                                 skip: 26
                             },
                             progressBarColor = "#4a90e2",
                             iconGap = "24px"
                         }) => {
    const progressPercent = (currentTime / duration) * 100;

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${("0" + seconds).slice(-2)}`;
    };

    return (
        <div className="audio-controller">
            <div className="audio-controls">
                <span className="time">{formatTime(currentTime)}</span>
                <div className="progress-bar">
                    <div
                        className="progress"
                        style={{
                            width: `${progressPercent}%`,
                            backgroundColor: progressBarColor
                        }}
                    ></div>
                </div>
                <span className="time">{formatTime(duration)}</span>
            </div>

            <div
                className="controls"
                style={{ gap: iconGap }}
            >
                <button><IoPlayBack size={iconSize.skip} color={iconColor} /></button>
                <button onClick={onPlayPause}>
                    {isPlaying ? (
                        <IoPause size={iconSize.control} color={iconColor} />
                    ) : (
                        <IoPlay size={iconSize.control} color={iconColor} />
                    )}
                </button>
                <button><IoPlayForward size={iconSize.skip} color={iconColor} /></button>
            </div>
        </div>
    );
};

export default AudioController;
