import React, {createRef, useEffect, useState} from 'react';
import styles from './CanVas.module.css'

export default function CanVas() {

    const canvasRef = createRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        const myImg = new Image()
        myImg.src = "laika-x3.png"
        myImg.onload = () => {ctx.drawImage(myImg, 10, 10, 150, 100)}
        ctx.fillStyle = 'green';
        ctx.fillRect(10, 10, 150, 100);
    })
    return (
        <div className="editor-canvas">
            <div className={styles.canvasBox}>
            <canvas
                ref={canvasRef}
                width={window.innerWidth}
                height={window.innerHeight}
            > </canvas>
            </div>
        </div>
    );
};