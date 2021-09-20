import React from 'react'
import { Link } from 'react-router-dom'

const FloatNav = (props) => {
  return (
    <React.Fragment>
      <div className="float-nav">
        <ul>
          <li className="link-first hand bg" onClick={() => window.open('https://github.com')}></li>
          <li
            className="link-second hand bg"
            onClick={() => window.open('https://paperswithcode.com/sota')}
          ></li>
          <Link to="/RoadMap">
            <li className="link-third hand bg"></li>
          </Link>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default FloatNav
