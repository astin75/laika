import { Button, Select, Table, Text, Timeline } from '@mantine/core'
//-----------------------------------------------
import { imageInfoCollection, userProfileCollection } from 'imports/db/collections'
import { gtInfoCollection } from 'imports/db/collections'
import { projectCollection } from 'imports/db/collections'
import { Meteor } from 'meteor/meteor'
import { useTracker } from 'meteor/react-meteor-data'
import React, { createRef, useRef, useState } from 'react'
//----------------------------------------------
import NavigationBar from 'ui/components/NavigationBar/NavigationBar'
import styles from 'ui/pages/OptionPage/DataManagement/UserControl/UserControl.module.css'

import styels from './RoadMap.module.css'

export default function RoadMap() {
  const [downloadUrl, setDownloadUrl] = useState('')
  const downClick = useRef(null)

  const projectList = useTracker(() => projectCollection.find({}).fetch())
  const onRankChange = (e, projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch()
    let imageInfo = imageInfoCollection.find({ projectName: projectName }).fetch()
  }

  // console.log(gtinfo, 1)
  // console.log(imageInfo, 2)

  //userProfileCollection.update(oops._id, { $set: { rank: rank } })

  const onDownload = (projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch()
    let imageInfo = imageInfoCollection.find({ projectName: projectName }).fetch()
    e.preventDefault()
    let output
    let fileType = 'json'
    if (fileType === 'json') {
      output = JSON.stringify({ states: this.state.data }, null, 4)
      const blob = new Blob([output])
      setDownloadUrl(URL.createObjectURL(blob))
      downClick.current.URL.revokeObjectURL(downloadUrl)

      setDownloadUrl(URL.createObjectURL(blob))
    }
  }

  const onDelete = (userName) => {
    let oops = Meteor.users.findOne({ userName: userName })
    Meteor.users.remove(oops._id)
  }

  const handleChange = (option) => {
    setRank(option)
  }

  return (
    <div className={styels.container}>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th align={'right'}>순번</th>
            <th>아이디</th>
            <th>권한 등급</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {projectList &&
            projectList.map((x, idx) => (
              <tr key={x._id}>
                <td>{idx + 1}</td>
                <td>{x.projectName}</td>
                <td></td>
                <td>
                  <Button
                    color="teal"
                    size="compact-sm"
                    onClick={() => onRankChange(x.projectName)}
                  >
                    적용
                  </Button>
                  &nbsp; / &nbsp;
                  <Button
                    disabled={true}
                    color="red"
                    size="compact-sm"
                    onClick={() => onDelete(x.projectName)}
                  >
                    삭제
                  </Button>
                  <Button size="compact-sm" onClick={(event) => onDownload(event, x.projectName)}>
                    다운로드
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <a className="hidden" download={'states.json'} href={downloadUrl} ref={downClick}>
        download it
      </a>
      {/*<Timeline active={1} bulletSize={24} lineWidth={3}>*/}
      {/*  <Timeline.Item title="New branch">*/}
      {/*    <Text color="white" size="md">*/}
      {/*      You&apos;ve created new branch{' '}*/}
      {/*      <Text component="span" inherit>*/}
      {/*        fix-notifications*/}
      {/*      </Text>{' '}*/}
      {/*      from master*/}
      {/*    </Text>*/}
      {/*    <Text size="xs" style={{ marginTop: 4 }}>*/}
      {/*      2 hours ago*/}
      {/*    </Text>*/}
      {/*  </Timeline.Item>*/}

      {/*  <Timeline.Item title="New branch">*/}
      {/*    <Text color="white" size="md">*/}
      {/*      You&apos;ve created new branch{' '}*/}
      {/*      <Text component="span" inherit>*/}
      {/*        fix-notifications*/}
      {/*      </Text>{' '}*/}
      {/*      from master*/}
      {/*    </Text>*/}
      {/*    <Text size="xs" style={{ marginTop: 4 }}>*/}
      {/*      2 hours ago*/}
      {/*    </Text>*/}
      {/*  </Timeline.Item>*/}

      {/*  <Timeline.Item title="New branch" lineVariant="dashed">*/}
      {/*    <Text color="white" size="md">*/}
      {/*      You&apos;ve created new branch{' '}*/}
      {/*      <Text component="span" inherit>*/}
      {/*        fix-notifications*/}
      {/*      </Text>{' '}*/}
      {/*      from master*/}
      {/*    </Text>*/}
      {/*    <Text size="xs" style={{ marginTop: 4 }}>*/}
      {/*      2 hours ago*/}
      {/*    </Text>*/}
      {/*  </Timeline.Item>*/}

      {/*  <Timeline.Item title="New branch">*/}
      {/*    <Text color="white" size="md">*/}
      {/*      You&apos;ve created new branch{' '}*/}
      {/*      <Text component="span" inherit>*/}
      {/*        fix-notifications*/}
      {/*      </Text>{' '}*/}
      {/*      from master*/}
      {/*    </Text>*/}
      {/*    <Text size="xs" style={{ marginTop: 4 }}>*/}
      {/*      2 hours ago*/}
      {/*    </Text>*/}
      {/*  </Timeline.Item>*/}
      {/*</Timeline>*/}
      <NavigationBar />
    </div>
  )
}
