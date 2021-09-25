import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NotFound extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="not-found">
          <div className="content">
            <h1>404</h1>
            <p className="lead">주소를 잘 못 입력하셨습니다. 선생님;</p>
            <Link to="/" className="btn-go-back">
              추적 중지
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NotFound;
