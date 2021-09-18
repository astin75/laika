import React from 'react'

export default function CanVas() {
  return (
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
  )
}
