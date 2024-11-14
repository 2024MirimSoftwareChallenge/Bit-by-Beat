import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./signUpDetail.css";

export default function SignUpDetail() {
    const navigate = useNavigate();
    const [inputCount, setInputCount] = useState(0);
    const [buttonOn, setButtonOn] = useState(false);

    const handleAddButtonClick = () => {
        navigate("/SignUpDetail");
    };

    // 1글자라도 입력되면 버튼 색 바뀌기
    const changeButton = () => {
        setButtonOn(true);
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
                           maxLength='5'
                            onInput={(e) => {
                                handleOnInput(e, 5)
                            }}/>
                    <p className="">({inputCount}/5)</p>
                </main>
            </div>

            <div className="btn-container">
                <button
                    type="submit"
                    className={buttonOn ? 'btnOk' : 'btnNotOk'}>
                    완료</button>
            </div>
        </div>
    );
}