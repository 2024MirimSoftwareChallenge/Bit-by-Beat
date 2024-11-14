import React from "react";
import { useNavigate } from "react-router-dom";
import "./signUp.css";

export default function SignUp() {
    const navigate = useNavigate();

    const handleAddButtonClick = () => {
        navigate("/SignUp");
    };
    return (
        <div className="container">
            <header className="signup-header">
                <img src="/line.png"/>
                <div className="title">
                    <p>일상을 기록하다</p>
                    <p>Bit by Beat</p>
                </div>
            </header>

            <main className="logo-container">
                <img className="logo" src="/logo.png"/>
            </main>

            <div className="btn-container">
                <img src="/googleLogo.png" className='google-logo'/>
                <button className="login-btn">구글 로그인</button>
            </div>
        </div>
    );
}