import React, { useState } from 'react';
import './calendar.css';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // 선택한 월의 일수를 계산
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // 해당 월의 첫째 날 요일 계산 (0: 일요일, 1: 월요일, ..., 6: 토요일)
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    // 이전 또는 다음 달로 이동하는 함수
    const changeMonth = (offset) => {
        const newDate = new Date(year, month + offset, 1);
        setCurrentDate(newDate);
    };

    // 날짜 렌더링 함수
    const renderCalendarDays = () => {
        const daysArray = [];

        // 첫째 날 이전 빈 공간 추가
        for (let i = 0; i < firstDayOfMonth; i++) {
            daysArray.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
        }

        // 실제 날짜 추가
        for (let day = 1; day <= daysInMonth; day++) {
            daysArray.push(
                <div key={day} className="calendar-day">
                    <span>{day}</span>
                </div>
            );
        }

        return daysArray;
    };

    return (
        <div className="calendar-container">
            <header className="calendar-header">
                <h2>{year}.{(month + 1).toString().padStart(2, '0')}</h2>
                <div className="navigation">
                    <button onClick={() => changeMonth(-1)} className="navigation-after"></button>
                    <button onClick={() => changeMonth(1)} className="navigation-before"></button>
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
    );
};

export default Calendar;
