import React, { useState, useRef } from 'react';
import './writeSecond.css';
import { useLocation, useNavigate  } from 'react-router-dom';
import axios from 'axios'; // axios를 import

function WriteSecond() {

    const location = useLocation();
    const navigate = useNavigate();
    const imageUrl = location.state?.imageUrl; // 이전 페이지에서 전달된 이미지 URL 받아옴
    const songId = location.state?.songId;      // 이전 페이지에서 전달된 songId
    const songTitle = location.state?.songTitle;
    const [tags, setTags] = useState([]);
    const [diaryContent, setDiaryContent] = useState(""); // 일기 내용 상태 추가
    const inputRefs = useRef([]);

    const addTagInput = () => {
        setTags([...tags, '']);
    };

    // 태그 값 업데이트 함수
    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);

        if (inputRefs.current[index]) {
            const input = inputRefs.current[index];
            input.style.width = `${Math.max(10, input.scrollWidth + 5)}px`;
        }
    };

    const handleBlur = (index) => {
        if (inputRefs.current[index]) {
            const input = inputRefs.current[index];
            input.style.width = `${Math.max(10, input.scrollWidth + 5)}px`;
        }
    };

    const handleContentChange = (e) => {
        setDiaryContent(e.target.value); // 일기 내용 업데이트
    };

    const handleSubmit = async () => {
        try {
            const diaryData = {
                content: diaryContent, // 작성된 일기 내용
                tags: tags, // 입력된 태그들
                img_path: imageUrl, // 이미지 URL
                song_id: songId,
                user_id: 1,
            };

            // 서버에 일기 데이터 전송
            const response = await axios.post('http://localhost:8080/api/diaries', diaryData);

            if (response.status === 200) {
                alert('일기가 성공적으로 저장되었습니다.');
                navigate('/');
            } else {
                alert('일기 저장에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error saving diary:', error);
            alert('일기 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="write-container">
            {/* Header Section */}
            <header className="write-header">
                <button className="close-button">이전</button>
                <h2 className="write-date">10월 21일 월요일</h2>
                <button className="more-button" onClick={handleSubmit}>완료</button>
            </header>

            <div className="content">
                <div className="song-selection">
                    <div className="writesecond-image">
                        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
                    </div>
                    <span className="select-song-text">{songTitle}</span>
                </div>

                <hr className="divider" />

                <div className="tag-section">
                    <button className="add-tag-button" onClick={addTagInput}>태그 추가</button>

                    {tags.map((tag, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            onBlur={() => handleBlur(index)}
                            className="tag-input"
                            placeholder="#"
                            style={{ width: `${Math.max(10, tag.length * 10)}px` }}
                        />
                    ))}
                </div>

                <hr className="divider" />

                {/* Diary Content Textarea */}
                <textarea
                    className="diary-textarea"
                    placeholder="오늘은 어떤 하루였나요?"
                    value={diaryContent}
                    onChange={handleContentChange}
                />
            </div>
        </div>
    );
}

export default WriteSecond;
