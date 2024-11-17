import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import { auth } from '../fbase';
import axios from 'axios';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import "./signUp.css";

function SignUp() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);     // 구글로그인 후 받은 사용자 data 저장

    // firebase google login 구현
    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();

        try {
            const data = await signInWithPopup(auth, provider);
            setUserData(data.user);
            console.log(data.user);
            console.log(data);

            // 백엔드로 email 전송
            const response = await axios.post("http://localhost:8080/api/users/login", {
                email: data.user.email,
                name: data.user.displayName
            });

            console.log(response);

            // 리다이렉션하면서 state값 넘기기
            navigate("/SignUpDetail", { state: { email: data.user.email }});
        } catch(error) {
            console.log("Error during login or data submission : ", error);
        }
    }

    return (
        <div className="signup-container">
            <header className="signup-header">
                <img src="/line.png" className="signup-line-img"/>
                <div className="title">
                    <p>일상을 기록하다</p>
                    <p>Bit by Beat</p>
                </div>
            </header>

            <main className="logo-container">
                <img className="signup-logo" src="/logo.png"/>
            </main>

            <div className="btn-container">
                <img src="/googleLogo.png" className='google-logo'/>
                <button
                    className="login-btn"
                    onClick={handleGoogleLogin}
                    >구글 로그인</button>
            </div>
            {/* 로그인 후 사용자 정보를 표시 */}
            {userData && (
                <div className="user-info">
                    <p>환영합니다, {userData.displayName}님!</p>
                    <p>Email: {userData.email}</p>
                </div>
            )}
        </div>
    );
}

export default SignUp;