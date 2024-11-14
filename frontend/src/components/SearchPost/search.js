import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "../navbar";
import Tag from "../tag";
import Post from '../SearchPost/post';
import "./search.css";

const Search = () => {
    // const navigate = useNavigate();
    //
    // const handleSearchButtonClick = () => {
    //     // navigate("/Write");
    // };

    // 컴포넌트에 style 적용
    const StyledPost = styled(Post)`
    `;

    return (
        <div className="container">
            <header className="search-header">
                <form action="/search" method="GET" className="search-form">
                    <input type="search"
                           name="searchValue"
                           className="search-input"
                           placeholder="검색어를 입력해주세요"/>
                    <span><img src="/images/tabler_search.png" className="search-img"/></span>
                </form>
                <div className="tag-box">
                    <Tag text="#사랑"/>
                    <Tag text="#수면부족"/>
                </div>
            </header>
            <main className="search-main">
                <div className="search-title-container">
                    <h1 className="search-title">1년 전 오늘 들었던 음악</h1>
                </div>
                {/* db에서 받아온 데이터 넣기 */}
                <StyledPost
                      url="/images/post-img.png"
                      title="여행"
                      date="2024.09.03"
                      content="속초에 도착해서 처음으로 떡볶이를 먹었다. 정말 맛있어dy!!..."/>
            </main>
            <Nav />
        </div>
    );
};

export default Search;
