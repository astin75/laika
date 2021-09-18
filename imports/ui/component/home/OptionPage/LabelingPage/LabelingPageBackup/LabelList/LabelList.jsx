import React from 'react'

export default function LabelList() {
  return (
    <div className="elements">
      <ul>
        <li>
          <input type="radio" id="rect" name="element" />
          <label htmlFor="rect">
            <i className="icon icon-rectangle"></i> Rect{' '}
            <span className="arrow icon-arrow-down"></span>
          </label>
          <div className="element-list">
            <ul>
              <li>
                <div className="element-title">Select label</div>
                <button
                  className="btn btn-delete icon-trash"
                  onClick={() => alert('삭제..')}
                ></button>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <input type="radio" id="point" name="element" />
          <label htmlFor="point">
            <i className="icon icon-point"></i> Point{' '}
            <span className="arrow icon-arrow-down"></span>
          </label>
          <div className="element-list-empty">
            <i className="icon icon-box-opened"></i>
            no labels created for <br /> this image yet
          </div>
        </li>
        <li>
          <input type="radio" id="line" name="element" />
          <label htmlFor="line">
            <i className="icon icon-line"></i> Line <span className="arrow icon-arrow-down"></span>
          </label>
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
          <label htmlFor="polygon">
            <i className="icon icon-polygon"></i> Polygon{' '}
            <span className="arrow icon-arrow-down"></span>
          </label>
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
  )
}
