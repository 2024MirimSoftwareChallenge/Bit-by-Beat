import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../MusicPlayer/musicPlayer";
import Nav from "../navbar";
import axios from "axios";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();
    const [todayDiary, setTodayDiary] = useState(null);

    const handleAddButtonClick = () => {
        navigate("/WriteFirst");
    };

    const handleCardClick = () => {
        if (todayDiary) {
            navigate("/diary"); // 오늘 일기가 있으면 /diary로 이동
        }
    };

    useEffect(() => {
        const fetchTodayDiary = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/diaries/today");
                setTodayDiary(response.data || null); // 오늘 일기가 없으면 null
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching today's diary:", error);
            }
        };
        fetchTodayDiary();
    }, []);

    return (
        <div className="main-screen">
            <header className="home-header">
                <div className="home-greeting">
                    <h1>미림님</h1>
                    <p>오늘은 어떤 음악을 들으셨나요?</p>
                </div>
            </header>

            <main className="home-card-container" onClick={handleCardClick}>
                {todayDiary ? (
                    <MusicPlayer
                        diary={todayDiary} // 일기 데이터를 전달
                        onAddButtonClick={handleAddButtonClick}
                    />
                ) : (
                    <MusicPlayer onAddButtonClick={handleAddButtonClick}/>
                )}
            </main>
            <Nav />
        </div>
    );
};

export default Home;
