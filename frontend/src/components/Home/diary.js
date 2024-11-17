import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // axios 추가
import './diary.css';
import { useNavigate } from 'react-router-dom';
import AudioController from '../MusicPlayer/audioController';

const Diary = () => {
    const navigate = useNavigate();
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // 일기 데이터 상태 추가
    const [diaryData, setDiaryData] = useState(null);

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

    // 오늘 날짜의 일기 데이터 가져오기
    useEffect(() => {
        const fetchDiaryData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/diaries/today'); // 오늘 날짜의 일기 가져오기
                setDiaryData(response.data); // 받은 데이터를 상태에 저장
            } catch (error) {
                console.error("Error fetching diary data:", error);
            }
        };

        fetchDiaryData();
    }, []); // 컴포넌트가 처음 렌더링 될 때만 호출

    // 날짜 포맷팅 함수
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}.${month}.${day}`;
    };

    const handleExitButtonClick = () => {
        navigate('/');
    };

    if (!diaryData) {
        return <div>Loading...</div>; // 데이터를 아직 받지 못했으면 로딩 메시지
    }

    return (
        <div className="diary">
            <button className="exit-button" onClick={handleExitButtonClick}>◀ 홈으로</button>
            <div className="diary-header">
                <img
                    src={diaryData.imgPath || "https://cdn.crowdpic.net/detail-thumb/thumb_d_4D24F988C28882891AB7778F32CF1285.jpg"} // imgPath가 없으면 기본 이미지 사용
                    alt="Cloud" className="diary-image"
                />
                <div className="diary-header-text">
                    <div className="diary-title">{diaryData.song.title}</div>
                    <div className="diary-date">{formatDate(diaryData.date)}</div>
                </div>
            </div>
            <div className="diary-tag">
                {diaryData.tags && diaryData.tags.map((tag, index) => (
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
                src={diaryData.song.songPath}
                onLoadedMetadata={handleLoadedMetadata}
                onTimeUpdate={handleTimeUpdate}
                onError={(e) => console.error("Audio loading error:", e)}
            ></audio>
        </div>
    );
};

export default Diary;
