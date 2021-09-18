import React, { Component } from 'react'

class Gnb extends Component {
  constructor(props) {
    super(props)

    this.state = {
      //
    }
  }

  render() {
    const goGit = () => {
      window.open('http://github.com')
    }

    return (
      <React.Fragment>
        <div className="gnb">
          <div className="gnb-branding">
            <i className="icon-laika"></i>Laika
          </div>
          <div className="gnb-snb">
            <ul>
              <li>
                <i className="icon-actions"></i>
                Actions
                <ul className="sub-list">
                  <li onClick={() => alert('Edit Lables')}>
                    <i className="icon-labels"></i> Edit Lables
                  </li>
                  <li>
                    <i className="icon-camera"></i> Import Images
                  </li>
                  <li>
                    <i className="icon-import-labels"></i> Import Annotations
                  </li>
                  <li>
                    <i className="icon-export-labels"></i> Export Annotations
                  </li>
                  <li>
                    <i className="icon-ai"></i> Load AI Model
                  </li>
                </ul>
              </li>
              <li>
                <i className="icon-more"></i>
                More
                <ul className="sub-list">
                  <li>
                    <i className="icon-documentation"></i> Documentation
                  </li>
                  <li>
                    <i className="icon-bug"></i> Bugs and Features
                  </li>
                </ul>
              </li>
            </ul>

            <div className="title">Project Name: my-project-name</div>

            <button className="btn btn-git git icon-git" onClick={() => goGit()}></button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Gnb
