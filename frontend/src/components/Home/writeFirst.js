import React, { useEffect, useState } from 'react';
import './writeFirst.css';
import { useNavigate } from 'react-router-dom';
import { RiFileMusicFill } from "react-icons/ri";
import axios from 'axios'; // axios를 추가하여 API 요청

const WriteFirst = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState("");
    const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태 추가

    useEffect(() => {
        // 오늘 날짜 설정
        const getTodayDate = () => {
            const date = new Date();
            const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}`;
            setToday(formattedDate);
        };

        getTodayDate();

        // 예시 데이터 가져오기
        const fetchSongs = async () => {
            try {
                // 실제 데이터 가져오는 부분을 API 호출로 대체 가능
                setSongs([
                    { id: 1, title: '사랑했나봐', artist: '윤도윤' },
                    { id: 2, title: '봄봄봄', artist: '장범준' },
                    { id: 3, title: 'spicy', artist: '에스파' },
                    { id: 4, title: '봄봄봄', artist: '장범준' },
                ]);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch songs:', error);
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    // 이미지 선택 핸들러
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file); // 이미지 미리보기 URL 생성
            setSelectedImage(imageUrl); // 미리보기 이미지 상태 업데이트
        }
    };

    const handleImageUpload = async () => {
        const fileInput = document.getElementById('file-input');
        const file = fileInput?.files[0];

        if (!file) {
            alert("이미지를 선택해주세요.");
            return null;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8080/api/diaries/uploadImage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return true;
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert("이미지 업로드에 실패했습니다.");
            return false;
        }
    };

    const navigateToNextPage = async () => {
        const uploadedImageUrl = await handleImageUpload();
        if (uploadedImageUrl) {
            navigate('/writeSecond', { state: { imageUrl: selectedImage } });
        }
    };

    return (
        <div className="music-container">
            <header className="writefirst-header">
                <button className="close-button">✕</button>
                <h2 className="writefirst-date">{today}</h2>
                <button className="more-button" onClick={navigateToNextPage}>다음</button>
            </header>

            {/* 이미지 업로드 영역 */}
            <div
                className="writefirst-image-placeholder"
                onClick={() => document.getElementById('file-input').click()} // 클릭 시 파일 선택창 열기
            >
                {selectedImage ? (
                    <img src={selectedImage} alt="선택된 이미지" className="selected-image" />
                ) : (
                    <div className="placeholder-text">사진 선택</div>
                )}
                {/* 파일 input 숨기고 클릭 시 파일 선택하게 함 */}
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>



            <button className="select-music-button">
                ♬ 오늘의 노래를 선택하세요
            </button>

            <div className="song-list">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    songs.map(song => (
                        <div key={song.id} className="song-item">
                            <div className="song-play-icon">
                                <RiFileMusicFill size="60" color="#AED1E5" />
                            </div>
                            <div className="song-info">
                                <div className="song-title">{song.title}</div>
                                <div className="song-artist">{song.artist}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WriteFirst;
