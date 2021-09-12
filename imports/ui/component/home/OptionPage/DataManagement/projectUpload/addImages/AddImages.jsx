import React from 'react';
export default function AddImages () {
    return (
        <form>

            <div className="form-row">
                <div className="form-group col-md-3">
                    <label>Annotations 함께 추가</label>
                    <select id="inputState" className="form-control">
                        <option>true</option>
                        <option selected="selected">false</option>
                    </select>
                </div>
                <div className="form-group col-md-3">
                    <br/>
                    <button type="submit" className="btn btn-secondary"> 폴더 열기</button>
                </div>
            </div>
        </form>
    );
};