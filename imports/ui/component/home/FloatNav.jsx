import React from 'react'

const FloatNav = props => {
  return(
    <React.Fragment>
      <div className="float-nav">
        <ul>
          <li
            className="link-first hand bg"
            onClick={() => window.open("https://github.com")}
          >
          </li>
          <li
            className="link-second hand bg"
            onClick={() => window.open("https://github.com")}
          >
          </li>
          <li
            className="link-third hand bg"
            onClick={() => window.open("https://github.com")}
          >
          </li>
        </ul>
      </div>
    </React.Fragment>
  )
}

export default FloatNav
