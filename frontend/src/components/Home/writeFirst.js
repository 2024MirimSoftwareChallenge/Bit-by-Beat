import React, { useEffect, useState } from 'react';
import './writeFirst.css';
import { useNavigate } from 'react-router-dom';
import { RiFileMusicFill } from "react-icons/ri";
import axios from 'axios';

const WriteFirst = () => {
    const navigate = useNavigate();
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [today, setToday] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedSong, setSelectedSong] = useState(null); // 선택된 노래 상태 추가

    useEffect(() => {
        const getTodayDate = () => {
            const date = new Date();
            const dayNames = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
            const formattedDate = `${date.getMonth() + 1}월 ${date.getDate()}일 ${dayNames[date.getDay()]}`;
            setToday(formattedDate);
        };

        getTodayDate();

        const fetchSongs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/songs'); // Spring Boot API 주소
                setSongs(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch songs:', error);
                setLoading(false);
            }
        };

        fetchSongs();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
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
            console.log("이미지 업로드 성공")
            return response.data;
        } catch (error) {
            console.error('이미지 업로드 실패:', error);
            alert("이미지 업로드에 실패했습니다.");
            return null;
        }
    };

    const handleSongSelect = (song) => {
        setSelectedSong(song); // 선택된 노래를 상태에 저장
    };

    const navigateToNextPage = async () => {
        const uploadedImageUrl = await handleImageUpload();
        if (uploadedImageUrl && selectedSong) {
            const fullImageUrl = `http://localhost:8080${uploadedImageUrl}`;
            navigate('/writesecond', { state: { imageUrl: fullImageUrl, songId: selectedSong.id, songTitle: selectedSong.title } });
        } else if (!selectedSong) {
            alert("노래를 선택해주세요.");
        }
    };

    return (
        <div className="music-container">
            <header className="write-header">
                <button className="close-button">✕</button>
                <h2 className="writefirst-date">{today}</h2>
                <button className="more-button" onClick={navigateToNextPage}>다음</button>
            </header>

            <div
                className="writefirst-image-placeholder"
                onClick={() => document.getElementById('file-input').click()}
            >
                {selectedImage ? (
                    <img src={selectedImage} alt="선택된 이미지" className="selected-image" />
                ) : (
                    <div className="placeholder-text">사진 선택</div>
                )}
                <input
                    type="file"
                    id="file-input"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                />
            </div>

            <button className="select-music-button">
                {selectedSong ? selectedSong.title : "♬ 오늘의 노래를 선택하세요"}
            </button>

            <div className="song-list">
                {loading ? (
                    <div className="loading">Loading...</div>
                ) : (
                    songs.map(song => (
                        <div key={song.id} className="song-item" onClick={() => handleSongSelect(song)}>
                            <div className="song-play-icon">
                                <RiFileMusicFill size="60" color="#AED1E5" />
                            </div>
                            <div className="song-info">
                                <div className="song-title">{song.title}</div>
                                <div className="song-artist">{song.singer}</div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default WriteFirst;
