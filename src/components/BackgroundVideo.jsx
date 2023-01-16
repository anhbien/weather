import React from "react";
import { css } from '@emotion/css'

const videoStyle = css`
    box-sizing: border-box;
    height: 56.25vw;
    left: 50%;
    min-height: 100%;
    min-width: 100%;
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    width: 177.77777778vh;
`

const container = css`
    overflow: hidden;
    background: #eee;
    height: 100vh;
    padding: 0;
    position: relative;
`

function BackgroundVideo(props) {
    const condition = props.condition
    var src
    if (condition.toLowerCase().includes('rain'))
        src = "393975453"
    else if (condition.toLowerCase().includes('cloud'))
        src = "354645633"
    else if (condition.toLowerCase().includes('snow'))
        src = "375346491"
    else if (condition.toLowerCase().includes('thunder'))
        src = "660197021"
    else
        src = "344831830"
    return (
        <div className={container}>
            <iframe src={`https://player.vimeo.com/video/${src}?title=0&autoplay=1&loop=1&background=1`} allow="autoplay; fullscreen" title="Background Video" frameBorder={0} className={videoStyle} ></iframe>
        </div>
    );
}

export default BackgroundVideo