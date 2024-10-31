import React from "react";
import { useNavigate } from "react-router-dom";
import MusicPlayer from "../MusicPlayer/musicPlayer";
import "./home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate("/Write");
    };
    return (
        <div className="main-screen">
            <header className="header">
                <div className="greeting">
                    <h1>미림님</h1>
                    <p>오늘은 어떤 음악을 들으셨나요?</p>
                </div>
            </header>

            <main className="card-container">
                <MusicPlayer onAddButtonClick={handleAddButtonClick}  />
            </main>

        </div>
    );
};

export default Home;
