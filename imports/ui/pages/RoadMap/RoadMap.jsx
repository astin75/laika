import { Button, Select, Table, Text, Timeline } from '@mantine/core';
import saveAs from 'file-saver';
//-----------------------------------------------
import { imageInfoCollection, userProfileCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import { projectCollection } from 'imports/db/collections';
import Images from 'imports/db/files';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { createRef, useRef, useState } from 'react';
//----------------------------------------------
import NavigationBar from 'ui/components/NavigationBar/NavigationBar';
import styles from 'ui/pages/OptionPage/DataManagement/UserControl/UserControl.module.css';

import styels from './RoadMap.module.css';

export default function RoadMap() {
  this.state = {
    fileType: 'json',
    fileDownloadUrl: null,
    status: '',
    data: [
      { state: 'Arizona', electors: 11 },
      { state: 'Florida', electors: 29 },
      { state: 'Iowa', electors: 6 },
      { state: 'Michigan', electors: 16 },
      { state: 'North Carolina', electors: 15 },
      { state: 'Ohio', electors: 18 },
      { state: 'Pennsylvania', electors: 20 },
      { state: 'Wisconsin', electors: 10 },
    ],
  };
  const downloadFile = ({ data, fileName, fileType }) => {
    // Create a blob with the data we want to download as a file
    const blob = new Blob([data], { type: fileType });
    // Create an anchor element and dispatch a click event on it
    // to trigger a download
    const a = document.createElement('a');
    a.download = fileName;
    a.href = window.URL.createObjectURL(blob);
    const clickEvt = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    a.dispatchEvent(clickEvt);
    a.remove();
  };

  const multiDownloadFile = (links) => {
    let zip = new JSZip();
    var count = 0;
    let zipFilename = 'Pictures.zip';

    links.forEach(function (url, i) {
      var filename = i + '.json';

      let blob = new Blob([JSON.stringify(url, null, 4)], { type: 'text/json' });
      let webUrl = URL.createObjectURL(blob);

      // console.log(url, i);
      //
      // // loading a file and add it in a zip file
      // // JSZipUtils.getBinaryContent(webUrl, function (err, data) {
      // //   if (err) {
      // //     throw err; // or handle the error
      // //   }
      //
      // zip.file(filename, blob, { binary: true });
      //
      // count++;
      // if (count == links.length) {
      //   zip.generateAsync({ type: 'blob' }).then(function (content) {
      //     saveAs(content, zipFilename);
      //   });
      // }
    });
  };

  const [downloadUrl, setDownloadUrl] = useState('');
  const downClick = useRef(null);

  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const onRankChange = (e, projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch();
    let imageInfo = imageInfoCollection.find({ projectName: projectName }).fetch();
  };

  // console.log(gtinfo, 1)
  // console.log(imageInfo, 2)

  //userProfileCollection.update(oops._id, { $set: { rank: rank } })

  const onDownload = (e, projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch();
    let imgRaw = Images.find({ public: projectName }).cursor;
    console.log(imgRaw);
    e.preventDefault();
    multiDownloadFile(gtinfo);
    // downloadFile({
    //   data: JSON.stringify(gtinfo[0], null, 4),
    //   fileName: 'users.json',
    //   fileType: 'text/json',
    // });
  };

  const onDelete = (userName) => {
    let oops = Meteor.users.findOne({ userName: userName });
    Meteor.users.remove(oops._id);
  };

  const handleChange = (option) => {
    setRank(option);
  };

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
                  <Button
                    download={'states.json'}
                    href={downloadUrl}
                    size="compact-sm"
                    onClick={(event) => onDownload(event, x.projectName)}
                  >
                    다운로드
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

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
  );
}
