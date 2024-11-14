import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios'; // axios 추가
import './diary.css';
import AudioController from '../MusicPlayer/audioController';
import audioFile from "../../assets/example.mp3"; // 예시 오디오 파일

const Diary = () => {
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

    // API 호출해서 일기 데이터 받아오기
    useEffect(() => {
        const fetchDiaryData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/diaries/2'); // 1번 ID를 가진 일기 가져오기
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

    // 로딩 중이거나 오류가 있을 때 화면 처리
    if (!diaryData) {
        return <div>Loading...</div>; // 데이터를 아직 받지 못했으면 로딩 메시지
    }

    return (
        <div className="diary">
            <div className="diary-header">
                <img
                    src={diaryData.imgPath || "https://cdn.crowdpic.net/detail-thumb/thumb_d_4D24F988C28882891AB7778F32CF1285.jpg"} // imgPath가 없으면 기본 이미지 사용
                    alt="Cloud" className="diary-image"
                />
                <div className="diary-header-text">
                    <div className="diary-title">{diaryData.songTitle}</div> {/* songTitle을 표시 */}
                    <div className="diary-date">{formatDate(diaryData.date)}</div>
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
