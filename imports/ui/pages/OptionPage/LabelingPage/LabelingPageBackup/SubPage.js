import React, { Component } from 'react'
import Gnb from './Gnb.js'
import FileList from './FileList/FileList'
import Center from './Center/Center'
import LabelList from './LabelList/LabelList'

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

    return (
      <React.Fragment>
        <main>
          <Gnb />
          <div className="content p-t-34">
            <FileList />
            <Center />
            <LabelList />
          </div>
        </main>
      </React.Fragment>
    )
  }
}

export default SubPage
