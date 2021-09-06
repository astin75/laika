import React, {useEffect, useState} from 'react';

export default function CanVas() {
    const canvas = document.getElementById('canvas2');
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'green';
    ctx.fillRect(50, 50, 150, 100);


    return (
        <div className="editor-canvas">
            <canvas id={"canvas2"}></canvas>
        </div>
    );
};