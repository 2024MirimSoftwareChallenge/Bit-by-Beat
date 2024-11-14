import React from "react";
import "./post.css";

export default function Post({url, title, date, content, className}) {
    return (
        <div className={`post-container ${className}`}>
            <img src={url} alt="post-img" className="post-img"/>
            <div className="post-main">
                <div className="post-layout">
                    <h2 className="post-title">{title}</h2>
                    <p className="post-date">{date}</p>
                </div>
                <img src="/images/Polygon.png" className="poly-img"/>
            </div>
            <p className="post-content">{content}</p>
        </div>
    );
};

// test용
// export default function Post({url, title, date, content}) {
//     return (
//         <div className="post-container">
//             <img src="/images/post-img.png" alt="post-img" className="post-img"/>
//             <div className="post-main">
//                 <div className="post-layout">
//                     <h2 className="post-title">여행</h2>
//                     <p className="post-date">2024.09.03</p>
//                 </div>
//                 <img src="/images/Polygon.png" className="poly-img"/>
//             </div>
//             <p className="post-content">속초에 도착해서 처음으로 떡볶이를 먹었다. 정말 맛있어dy!!...</p>
//         </div>
//     );
// };