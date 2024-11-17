import React, { useState, useEffect } from "react";
import "./calendar.css";
import Nav from "../navbar";
import { BsFillTriangleFill } from "react-icons/bs";

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [images, setImages] = useState({});

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;

    // 선택한 월의 일수를 계산
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();

    useEffect(() => {
        // 이미지 데이터 가져오기
        const fetchImages = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/diaries/images?year=${year}&month=${month}`
                );
                const data = await response.json();
                const imageMap = data.reduce((acc, { date, imgPath }) => {
                    acc[date] = imgPath;
                    return acc;
                }, {});
                setImages(imageMap);
            } catch (error) {
                console.error("Failed to fetch images:", error);
            }
        };

        fetchImages();
    }, [year, month]);


    const renderCalendarDays = () => {
        const daysArray = [];

        // 첫째 날 이전 빈 공간 추가
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // 실제 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            const dateKey = `${year}-${(month).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

            const imageUrl = images[dateKey]; // 해당 날짜의 이미지 URL

            daysArray.push(
                <div key={day} className="calendar-day">
                    <span>{day}</span>
                    <div
                        className="square"
                        style={{
                            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none', // 이미지가 있을 경우만 설정
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    ></div>
                </div>
            );
        }

        return daysArray;
    };


    const changeMonth = (offset) => {
        const newDate = new Date(year, month - 1 + offset, 1);
        setCurrentDate(newDate);
    };

    return (
        <div>
            <div className="calendar-container">
                <header className="calendar-header">
                    <h2>
                        {year}.{month.toString().padStart(2, "0")}
                    </h2>
                    <div className="calendar-navigation">
                        <button onClick={() => changeMonth(-1)} className="navigation-before">
                            <BsFillTriangleFill size="20" color="#85C7DF"/>
                        </button>
                        <button onClick={() => changeMonth(1)} className="navigation-after">
                            <BsFillTriangleFill size="20" color="#85C7DF"/>
                        </button>
                    </div>
                </header>
                <div className="days-of-week">
                    <span className="sunday">일</span>
                    <span>월</span>
                    <span>화</span>
                    <span>수</span>
                    <span>목</span>
                    <span>금</span>
                    <span className="saturday">토</span>
                </div>
                <hr className="divider"/>
                <div className="calendar-grid">{renderCalendarDays()}</div>
            </div>
            <Nav />
        </div>
    );

};

export default Calendar;
