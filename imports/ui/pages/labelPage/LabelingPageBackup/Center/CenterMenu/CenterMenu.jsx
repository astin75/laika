import React from 'react';

export default function CenterMenu() {
    return (
        <div className="editor-header">
            <ul>
                <li>
                    <button
                        className="btn btn-md btn-editor-header active icon-zoom-in"
                        onClick={() => popAlert('zoomIn')}
                    >
                    </button>
                </li>
                <li>
                    <button className="btn btn-md btn-editor-header icon-zoom-out"></button>
                </li>
                <li>
                    <button className="btn btn-md btn-editor-header icon-zoom-fit"></button>
                </li>
                <li>
                    <button className="btn btn-md btn-editor-header icon-zoom-max"></button>
                </li>
                <li>
                    <span className="exp"></span>
                </li>
                <li>
                    <button className="btn btn-md btn-editor-header icon-hand"></button>
                </li>
                <li>
                    <button className="btn btn-md btn-editor-header icon-cross-hair"></button>
                </li>
            </ul>
        </div>
    );
};