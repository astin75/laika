import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import FloatNav from 'imports/ui/components/FloatNav'

export default function Index() {
  return (
    <React.Fragment>
      <main>
        <div className="branding"></div>
        <div className="content">
          <div>
            <div></div>
          </div>
          <div className="snb">
            <ul>
              <li className="deep_logo bg">
                <div className="text-box">
                  <b>딥러닝</b>
                  <br />
                  라이카는 딥러닝 데이터 가공을 위한 플랫폼 입니다.
                </div>
              </li>
              <li className="meteor_logo bg">
                <div className="text-box">
                  <b>Meteor</b>
                  <br />
                  미티어를 활용하여 클라이언트/서버/DB 까지 빠르게 웹앱을 구성 하였습니다.
                </div>
              </li>
              <li className="labels bg">
                <div className="text-box">
                  <br />
                  <b>Multi labeling</b>
                  <br />
                  하나의 객체 For Bbox, Key-point, Polygon, Object ID and State labeling
                </div>
              </li>
              <li className="react-logo bg">
                <div className="text-box">
                  <b>React</b>
                  <br />
                  SPA의 UI 생성에 프론트앤드 플랫폼 리액트를 사용합니다.
                </div>
              </li>
              <li className="chrome-logo bg">
                <div className="text-box">
                  <b>크롬</b>
                  <br />
                  크롬에서 <b>만</b> 최적화 되어 있습니다. PC버전만 지원합니다..
                </div>
              </li>
              <li className="laika-dog bg">
                <div className="text-box">
                  <b>라이카는...</b>
                  <br />
                  지구생물중 최초로 우주여행을간 생물체입니다. 그리고 돌아 오지 못했지요...
                </div>
              </li>
            </ul>

            <Link to="/accountPage" className="btn btn-default btn-start">
              Get Started
            </Link>
          </div>
        </div>

        <FloatNav />
      </main>
    </React.Fragment>
  )
}
