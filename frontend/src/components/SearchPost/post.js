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