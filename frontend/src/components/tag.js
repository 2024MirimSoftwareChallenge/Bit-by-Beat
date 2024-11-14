import React from "react";
import "./tag.css";

export default function Tag({ text }) {
    return (
        <div className="tag-container">
            <span className="tag-content">{text}</span>
        </div>
    );
};