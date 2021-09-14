import React from 'react';
export default function AddImages () {
    return (

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Annotations 함께 추가</label>
                    <select defaultValue="false" id="inputState" className="form-control">
                        <option>true</option>
                        <option>false</option>
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <br/>
                    <br/>
                    <button type="submit" className="btn btn-secondary"> 폴더 열기</button>
                </div>
            </div>

    );
};