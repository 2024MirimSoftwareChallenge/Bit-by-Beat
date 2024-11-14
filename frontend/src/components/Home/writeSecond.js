import React, { useState, useRef } from 'react';
import './writeSecond.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // axios를 import

function WriteSecond() {

    const location = useLocation();
    const imageUrl = location.state?.imageUrl; // 이전 페이지에서 전달된 이미지 URL 받아옴
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
                song_id: 1,
                user_id: 1,
            };

            // 서버에 일기 데이터 전송
            const response = await axios.post('http://localhost:8080/api/diaries/', diaryData);

            if (response.status === 200) {
                alert('일기가 성공적으로 저장되었습니다.');
                // 성공 시, 다른 페이지로 리다이렉트 (필요시)
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
                <button className="close-button">✕</button>
                <h2 className="date">10월 21일 월요일</h2>
                <button className="done-button" onClick={handleSubmit}>완료</button>
            </header>

            {/* Content Section */}
            <div className="content">
                {/* Image Preview */}
                <div className="song-selection">
                    <div className="writesecond-image">
                        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
                    </div>
                    <span className="select-song-text">노래를 선택하세요</span>
                </div>

                <hr className="divider" />

                {/* Add Tag Section */}
                <div className="tag-section">
                    <button className="add-tag-button" onClick={addTagInput}>태그 추가</button>

                    {/* 태그 인풋 필드 */}
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
