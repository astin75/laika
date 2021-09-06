import React, { Component } from 'react'
import Gnb from './Gnb.js'

class SubPage extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  render() {

    const popAlert = (string) => {
      alert(string)
    }

    return(
      <React.Fragment>
        <main>
          <Gnb />
          <div className="content p-t-34">
            <div className="thumbnail">
              <ul>
                <li><img src="https://img.insight.co.kr/static/2019/07/29/700/100szy5r58944roby8t9.jpg" /></li>
                <li><img src="https://img.insight.co.kr/static/2019/07/29/700/100szy5r58944roby8t9.jpg" /></li>
                <li><img src="https://img.insight.co.kr/static/2019/07/29/700/100szy5r58944roby8t9.jpg" /></li>
                <li><img src="https://img.insight.co.kr/static/2019/07/29/700/100szy5r58944roby8t9.jpg" /></li>
              </ul>
            </div>
            <div className="editor">
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

              {/*
              <div className="editor-canvas">
                <img src="https://img.insight.co.kr/static/2019/07/29/700/100szy5r58944roby8t9.jpg" />
              </div>
              */}

              <div className="editor-upload">
                <div className="upload-box">
                  <input id="file" type="file" />
                  <i className="upload-icon"></i>
                  <label htmlFor="file">
                    <b>Drop Images</b>
                    <br />
                    or
                    <br />
                    <b>Click here to select them</b>
                  </label>
                </div>
              </div>

              <div className="editor-footer"></div>
            </div>
            <div className="elements">
              <ul>
                <li>
                  <input type="radio" id="rect" name="element" />
                  <label for="rect"><i className="icon icon-rectangle"></i> Rect <span className="arrow icon-arrow-down"></span></label>
                  <div className="element-list">
                    <ul>
                      <li>
                        <div className="element-title">Select label</div>
                        <button
                          className="btn btn-delete icon-trash"
                          onClick={() => alert('삭제..')}
                        >
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <input type="radio" id="point" name="element" />
                  <label for="point"><i className="icon icon-point"></i> Point <span className="arrow icon-arrow-down"></span></label>
                  <div className="element-list-empty">
                    <i className="icon icon-box-opened"></i>
                    no labels created for <br /> this image yet
                  </div>
                </li>
                <li>
                  <input type="radio" id="line" name="element" />
                  <label for="line"><i className="icon icon-line"></i> Line <span className="arrow icon-arrow-down"></span></label>
                  <div className="element-list">
                    <ul>
                      <li>
                        <div className="element-title">Select label</div>
                        <button className="btn btn-delete icon-trash"></button>
                      </li>
                    </ul>
                  </div>
                </li>
                <li>
                  <input type="radio" id="polygon" name="element" />
                  <label for="polygon"><i className="icon icon-polygon"></i> Polygon <span className="arrow icon-arrow-down"></span></label>
                  <div className="element-list">
                    <ul>
                      <li>
                        <div className="element-title">Select label</div>
                        <button className="btn btn-delete icon-trash"></button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default SubPage
