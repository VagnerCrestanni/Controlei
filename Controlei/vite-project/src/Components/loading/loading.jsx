import React from "react";
import "./loading.css";
import { createPortal } from "react-dom";

function Loading() {
    return createPortal(
        <div className='fundo-loading'>
            <img src="/fundo-dark-blue.jpg" alt="fundo" className='imagem-fundo' />'

        <div className = "OverlayFullScreen">
            <span className="LoadingText"></span>
        </div>
        </div>
    , document.getElementById("Loading-root"))
}

export default Loading