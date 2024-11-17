import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import "./signUpDetail.css";
import axios from "axios";

export default function SignUpDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;        // SignUp에서 전달한 state
    const [inputCount, setInputCount] = useState(0);
    const [buttonOn, setButtonOn] = useState(false);
    const [username, SetUsername] = useState("");

    // 1글자라도 입력되면 버튼 색 바뀌기
    const changeButton = () => {
        setButtonOn(true);
    }

    // 이름이 입력 되었을 때 업데이트
    const handleInputChange = (e) => {
        SetUsername(e.target.value);
    }

    // db에 사용자 이름 저장하기
    const handleNameSubmit = async () => {
        if(!username)   {
            alert("이름을 입력해주세요.");
            return;
        }
        try {
            // PATCH 보내기
            const response = await axios.patch("http://localhost:8080/api/users", {
                email: email,
                name: username
            })

            if(response.status === 200) {
                navigate("/");      // Home
            }
        }
        catch(error) {
            console.log("Error during name update : ", error);
        }
    }

    // 글자수 세기
    const handleOnInput = (e, maxLength) => {
        const { value } = e.target;
        if(value.length > maxLength)
            e.target.value = value.substring(0, maxLength);
        setInputCount(value.length);        // 입력 시 문자 수 업데이트
        setButtonOn(value.length > 0)
    }
    return (
        <div className="main-container">
            <div className="box">
                <header className="greeting">
                    <h1>반가워요!</h1>
                    <h1>이름을 알려주세요.</h1>
                </header>

                <main className="input-container">
                    <input type="text"
                           className="input-box"
                           placeholder="이름을 입력해주세요."
                           value={username}
                           maxLength='5'
                           onChange={handleInputChange}
                            onInput={(e) => {
                                handleOnInput(e, 5)
                            }}/>
                    <p className="">({inputCount}/5)</p>
                </main>
            </div>

            <div className="btn-container">
                <button
                    type="submit"
                    className={buttonOn ? 'btnOk' : 'btnNotOk'}
                    onClick={handleNameSubmit}
                    >
                    완료</button>
            </div>
        </div>
    );
}