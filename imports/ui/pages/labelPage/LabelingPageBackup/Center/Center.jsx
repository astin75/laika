import React from 'react';
import CenterMenu from "./CenterMenu/CenterMenu";
import CanVas from "./Canvas/CanVas";
export default function Center () {
    return (
        <div className="editor">
            <CenterMenu/>
            <CanVas/>

            {/*
              <div className="editor-canvas">
                <img src="https://img.insight.co.kr/static/2019/07/29/700/100szy5r58944roby8t9.jpg" />
              </div>
              */}

            <div className="editor-footer"></div>
        </div>
    );
};