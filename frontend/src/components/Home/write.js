import React, { useState, useRef } from 'react';
import './write.css';

function Write() {
    const [tags, setTags] = useState([]);
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

                <textarea
                    className="diary-textarea"
                    placeholder="오늘은 어떤 하루였나요?"
                />
            </div>
        </div>
    );
}

export default Write;
