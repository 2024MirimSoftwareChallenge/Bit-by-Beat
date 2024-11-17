import React from "react";
import "./smallpost.css";

export default function SmallPost({url, title, date, content, className}) {
    return (
        <div className={`s-post-container ${className}`}>
            <img src={url} alt="s-post-img" className="s-post-img"/>
            <div className="s-post-main">
                <div className="s-post-layout">
                    <h2 className="s-post-title">{title}</h2>
                    <p className="s-post-date">{date}</p>
                </div>
            </div>
            <p className="s-post-content">{content}</p>
        </div>
    );
};