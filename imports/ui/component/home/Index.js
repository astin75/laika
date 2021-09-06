import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FloatNav from './FloatNav'


class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  render() {

    return(
      <React.Fragment>
        <main>
          <div className="branding"></div>
          <div className="content">
            <div className="transform-bg">
              <div className="rotated-bg"></div>
            </div>
            <div className="snb">
              <ul>
                <li className="open-source bg">
                  <div className="text-box">
                    <h1>ee</h1>
                    Open source and free to use under GPLv3 license
                  </div>
                </li>
                <li className="labels bg">
                  <div className="text-box">
                    Support multiple label types - rects, lines, points and polygons
                  </div>
                </li>
                <li className="online bg">
                  <div className="text-box">
                    No advanced installation required, just open up your browser
                  </div>
                </li>
                <li className="file bg">
                  <div className="text-box">
                    Support output file formats like YOLO, VOC XML, VGG JSON, CSV
                  </div>
                </li>
                <li className="private bg">
                  <div className="text-box">
                    We don't store your images, because we don't send them anywhere
                  </div>
                </li>
                <li className="robot bg">
                  <div className="text-box">
                    Use AI to make your work more productive
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <FloatNav />

          <Link to="/subPage" className="btn btn-default btn-start">
            Get Started
          </Link>
        </main>
      </React.Fragment>
    )
  }
}

export default Index
