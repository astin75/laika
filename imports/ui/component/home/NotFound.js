import React, { Component} from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component
{
  render() {
    return(
      <React.Fragment>
        <div className="not-found">
          <div className="content">
            <h1>404</h1>
            <p className="lead">
              뭐해? 니 아이피 추적중...
            </p>
            <Link to="/" className="btn-go-back">
              추적 중지
            </Link>
          </div>
        </div>
  		</React.Fragment>
    )
  }
}

export default NotFound
