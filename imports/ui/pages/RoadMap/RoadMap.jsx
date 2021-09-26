import { Button, LoadingOverlay, Overlay, Select, Table, Text, Timeline } from '@mantine/core';
import saveAs from 'file-saver';
//-----------------------------------------------
import { imageInfoCollection } from 'imports/db/collections';
import { gtInfoCollection } from 'imports/db/collections';
import { projectCollection } from 'imports/db/collections';
import Images from 'imports/db/files';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React, { useState } from 'react';
//----------------------------------------------
import NavigationBar from 'ui/components/NavigationBar/NavigationBar';
import styles from 'ui/pages/OptionPage/DataManagement/UserControl/UserControl.module.css';

import styels from './RoadMap.module.css';

export default function RoadMap() {
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const [isLoading, setIsLoading] = useState(false);
  const onRankChange = (e, projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch();
    let imageInfo = imageInfoCollection.find({ projectName: projectName }).fetch();
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

  const multiDownloadFile = (rawImgs, gt) => {
    let zip = new JSZip();
    let zipFilename = 'Pictures.zip';

    // GT DB를 array -> json 으로 변경 후 -> blob 으로 변경뒤 zip.file로 push
    // 이미지 DB 리스트 link -> blob 으로 변경뒤 zip.file로 push
    if (gt.length > 1) {
      gt.forEach(function (gtValue, i) {
        let filename = i + '.json';
        let filename1 = i + '.jpg';
        let blob = new Blob([JSON.stringify(gtValue, null, 4)], { type: 'text/json' });

        let webUrl = String(Images.findOne(rawImgs[i]._id).link());
        let imgBlob = fetch(webUrl).then((res) => res.blob());
        zip.file(filename1, imgBlob, { binary: true });
        zip.file(filename, blob, { binary: true });
      });
    } else {
      let filename = 0 + '.json';
      let filename1 = 0 + '.jpg';
      let blob = new Blob([JSON.stringify(gt, null, 4)], { type: 'text/json' });

      let webUrl = String(Images.findOne(rawImgs[0]._id).link());
      let imgBlob = fetch(webUrl).then((res) => res.blob());
      zip.file(filename1, imgBlob, { binary: true });
      zip.file(filename, blob, { binary: true });
    }

    // 최종 zip 으로 out~
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      saveAs(content, zipFilename);
      setIsLoading(false);
    });
  };

  const onDownload = (e, projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch();
    let imgRaw = Images.find({ 'meta.projectName': projectName }).fetch();

    e.preventDefault();
    multiDownloadFile(imgRaw, gtinfo);
  };

  const onDelete = (projectName) => {
    let gtinfo = gtInfoCollection.find({ projectName: projectName }).fetch();
    let imginfo = imageInfoCollection.find({ projectName: projectName }).fetch();
    let rawImg = Images.find({ 'meta.projectName': projectName }).fetch();
    let prjectInfo = projectCollection.find({ projectName: projectName }).fetch();
    let count = 0;

    for (count = 0; count < gtinfo.length; count++) {
      gtInfoCollection.remove(gtinfo[count]._id);
      imageInfoCollection.remove(imginfo[count]._id);
      Images.remove({ _id: rawImg[count]._id });
    }

    projectCollection.remove(prjectInfo[0]._id);
  };

  return (
    <>
      {isLoading && (
        <div className="styles.overlay">
          <Overlay opacity={0.5} color="#000" zIndex={5} />
          <LoadingOverlay visible={isLoading} />
        </div>
      )}
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
                      disabled={false}
                      color="red"
                      size="compact-sm"
                      onClick={() => onDelete(x.projectName)}
                    >
                      삭제
                    </Button>
                    <Button
                      download={'states.json'}
                      size="compact-sm"
                      onClick={(event) => {
                        setIsLoading(true);
                        onDownload(event, x.projectName);
                      }}
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
    </>
  );
}
