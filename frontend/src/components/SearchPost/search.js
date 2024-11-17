import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Nav from "../navbar";
import Tag from "../tag";
import Post from "../SearchPost/post";
import SmallPost from "../SearchPost/smallPost";
import "./search.css";
import axios from "axios";

const Search = () => {
    const [tags, setTags] = useState([]); // 태그 목록
    const [posts, setPosts] = useState([]); // 특정 태그의 post 목록
    const [selectTag, setSelectTag] = useState(""); // 검색된 태그
    const [searchValue, setSearchValue] = useState(""); // 검색어 입력 값
    const [userId, setUserId] = useState(1); // 사용자 ID

    // 모든 태그를 불러옴
    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/search/tag");
                setTags(response.data);
            } catch (error) {
                console.log("Error fetching tags", error);
            }
        };
        fetchTags();
    }, []);

    // 특정 태그에 해당하는 post를 불러옴
    useEffect(() => {
        if (selectTag) {
            const fetchPostsByTag = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/search/posts-tag/${userId}`, {
                        params: { tag: selectTag },
                    });
                    setPosts(response.data);
                } catch (error) {
                    console.log("Error fetching posts by tag", error);
                }
            };
            fetchPostsByTag();
        }
    }, [selectTag, userId]);

    // 검색 form submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const trimmedSearchValue = searchValue.trim();
        if (trimmedSearchValue) {
            setSelectTag(trimmedSearchValue); // 검색된 태그 설정
            setSearchValue(""); // 입력창 초기화
        }
    };

    // 컴포넌트에 style 적용
    const StyledPost = styled(Post)`
        margin-bottom: 20px;
    `;

    const StyledSmallPost = styled(SmallPost)`
        margin-bottom: 20px;
    `;

    return (
        <div className="search-container">
            <header className="search-header">
                <form className="search-form" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        className="search-input"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} // 입력값 업데이트
                        placeholder="검색어를 입력해주세요"
                    />
                    <button type="submit" className="search-btn">
                        <img src="/images/tabler_search.png" className="search-img" alt="search" />
                    </button>
                </form>
                <div className="tag-box">
                    {tags.map((tag, index) => (
                        <Tag key={index} text={tag} />
                    ))}
                </div>
            </header>
            <main className="search-main">
                {selectTag ? (
                    <>
                        <div className="search-title-container">
                            <h1 className="search-title">#{selectTag}</h1>
                        </div>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <StyledSmallPost
                                    key={index}
                                    url={post.imgPath}
                                    title={post.songTitle}
                                    date={post.date}
                                    content={post.content}
                                />
                            ))
                        ) : (
                            <p>해당 태그에 대한 게시물이 없습니다.</p>
                        )}
                    </>
                ) : (
                    <>
                        <div className="search-title-container">
                            <h1 className="search-title">1년 전 오늘 들었던 음악</h1>
                        </div>
                        <StyledPost
                            url="/images/post-img.png"
                            title="여행"
                            date="2024.09.03"
                            content="속초에 도착해서 처음으로 떡볶이를 먹었다. 정말 맛있어!!..."
                        />

                        <div className="search-title-container">
                            <h1 className="search-title">#사랑</h1>
                        </div>
                        <StyledPost
                            url="/images/post-img.png"
                            title="여행"
                            date="2024.09.03"
                            content="속초에 도착해서 처음으로 떡볶이를 먹었다. 정말 맛있어!!..."
                        />
                    </>
                )}
            </main>
            <Nav />
        </div>
    );
};

export default Search;
