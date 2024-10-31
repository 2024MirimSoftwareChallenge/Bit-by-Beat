import React, { useState, useRef } from 'react';
import './write.css';

function Write() {
    const [tags, setTags] = useState([]); // 태그 목록을 저장하는 상태
    const inputRefs = useRef([]); // 각 인풋 필드의 참조를 저장하는 배열

    // 태그 입력 필드 추가 함수
    const addTagInput = () => {
        setTags([...tags, '']); // 새로운 빈 태그 인풋을 추가
    };

    // 태그 값 업데이트 함수
    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags); // 태그 인풋의 값을 업데이트

        // 개별 인풋 필드의 길이를 텍스트 길이에 맞게 조정
        if (inputRefs.current[index]) {
            const input = inputRefs.current[index];
            input.style.width = `${Math.max(10, input.scrollWidth + 5)}px`; // 여백 추가
        }
    };

    // 인풋 포커스 아웃 시 너비 조정
    const handleBlur = (index) => {
        if (inputRefs.current[index]) {
            const input = inputRefs.current[index];
            input.style.width = `${Math.max(10, input.scrollWidth + 5)}px`; // 다시 너비 조정
        }
    };

    return (
        <div className="write-container">
            {/* Header Section */}
            <header className="write-header">
                <button className="close-button">✕</button>
                <h2 className="date">10월 21일 월요일</h2>
                <button className="done-button">완료</button>
            </header>

            {/* Content Section */}
            <div className="content">
                {/* Song Selection */}
                <div className="song-selection">
                    <div className="song-icon">🎵</div>
                    <span className="select-song-text">노래를 선택하세요</span>
                </div>

                <hr className="divider" />

                {/* Add Tag Button */}
                <div className="tag-section">
                    <button className="add-tag-button" onClick={addTagInput}>태그 추가</button>

                    {/* 태그 인풋 필드 */}
                    {tags.map((tag, index) => (
                        <input
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)} // 인풋 필드 참조 저장
                            type="text"
                            value={tag}
                            onChange={(e) => handleTagChange(index, e.target.value)}
                            onBlur={() => handleBlur(index)} // 포커스를 잃었을 때 너비 조정
                            className="tag-input"
                            placeholder="#"
                            style={{ width: `${Math.max(10, tag.length * 10)}px` }} // 초기 너비 설정
                        />
                    ))}
                </div>

                <hr className="divider" />

                {/* Diary Entry */}
                <textarea
                    className="diary-textarea"
                    placeholder="오늘은 어떤 하루였나요?"
                />
            </div>
        </div>
    );
}

export default Write;
