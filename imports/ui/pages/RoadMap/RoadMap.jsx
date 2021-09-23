import {Button, Select, Table, Text, Timeline} from '@mantine/core';
import saveAs from 'file-saver';
//-----------------------------------------------
import {imageInfoCollection, userProfileCollection} from 'imports/db/collections';
import {gtInfoCollection} from 'imports/db/collections';
import {projectCollection} from 'imports/db/collections';
import Images from 'imports/db/files';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import {Meteor} from 'meteor/meteor';
import {useTracker} from 'meteor/react-meteor-data';
import React, {createRef, useRef, useState} from 'react';
//----------------------------------------------
import NavigationBar from 'ui/components/NavigationBar/NavigationBar';
import styles from 'ui/pages/OptionPage/DataManagement/UserControl/UserControl.module.css';

import styels from './RoadMap.module.css';

export default function RoadMap() {

    const downloadFile = ({data, fileName, fileType}) => {
        // Create a blob with the data we want to download as a file
        const blob = new Blob([data], {type: fileType});
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
        var count = 0;
        let zipFilename = 'Pictures.zip';

        rawImgs.forEach(function (link, i) {
            var filename1 = i + '.jpg';
            let webUrl = String(Images.findOne(rawImgs[i]._id).link())
            //console.log(filename1, webUrl)
            let imgBlob = fetch(webUrl)
                .then(res => res.blob())
            zip.file(filename1, imgBlob, {binary: true});

        });


        gt.forEach(function (gtValue, i) {
            var filename = i + '.json';

            let blob = new Blob([JSON.stringify(gtValue, null, 4)], {type: 'text/json'});

            zip.file(filename, blob, {binary: true});
        });

        zip.generateAsync({type: 'blob'}).then(function (content) {
            saveAs(content, zipFilename);
        });


    };

    const [downloadUrl, setDownloadUrl] = useState('');
    const downClick = useRef(null);

    const projectList = useTracker(() => projectCollection.find({}).fetch());
    const onRankChange = (e, projectName) => {
        let gtinfo = gtInfoCollection.find({projectName: projectName}).fetch();
        let imageInfo = imageInfoCollection.find({projectName: projectName}).fetch();
    };

    // console.log(gtinfo, 1)
    // console.log(imageInfo, 2)

    //userProfileCollection.update(oops._id, { $set: { rank: rank } })

    const onDownload = (e, projectName) => {
        let gtinfo = gtInfoCollection.find({projectName: projectName}).fetch();
        //let imgRaw = Images.findOne();
        let imgRaw = Images.find({meta: {projectName: projectName}}).fetch();
        //imgRaw = Images.findOne(imgRaw[0]._id).link()
        e.preventDefault();
        multiDownloadFile(imgRaw, gtinfo);
        // downloadFile({
        //   data: JSON.stringify(gtinfo[0], null, 4),
        //   fileName: 'users.json',
        //   fileType: 'text/json',
        // });
    };

    const onDelete = (projectName) => {
        let gtinfo = gtInfoCollection.find({projectName: projectName}).fetch()
        let imginfo = imageInfoCollection.find({projectName: projectName}).fetch()
        let rawImg = Images.find({meta: {projectName: projectName}}).fetch()
        let prjectInfo = projectCollection.find({projectName: projectName}).fetch()
        let count = 0

        for (count = 0; count < gtinfo.length; count++) {
            gtInfoCollection.remove(gtinfo[count]._id);
            imageInfoCollection.remove(imginfo[count]._id);
            Images.remove(rawImg[count]._id);
        }

        projectCollection.remove(prjectInfo[0]._id)

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
            <NavigationBar/>
        </div>
    );
}
