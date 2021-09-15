import React, {useEffect, useState} from 'react';
import styles from './OptionPage.module.css'
import {useTracker} from "meteor/react-meteor-data";
import {Meteor} from 'meteor/meteor';

import ProjectUpload from "./projectUpload/ProjectUpload";

import {projectCollection} from "../../../../../db/collections";


export const OptionPage = () => {
    const projectsSub = Meteor.subscribe('projectCollection');
    const user = useTracker(() => Meteor.user());
    const projectList = useTracker(() => projectCollection.find({}).fetch())
    const [IsThereAdmin, setIsThereAdmin] = useState(false);


    //console.log(user.profile['rank'])

    useEffect(() => {
        if (user !== undefined){
            if (user.profile['rank'] === 'admin') {
                setIsThereAdmin(true)
            }
        }
    }, [user])


    return (

        <main className={styles.main}>
            <div className={styles.header}>헤더</div>
            <div className={styles.body}>
                <div className={styles.left}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">프로젝트 이름</th>
                            <th scope="col">Column heading</th>
                            <th scope="col">Column heading</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projectList !== undefined ? (
                            projectList.map( x => (
                                <tr className="table-active">
                                    <th scope="row"></th>
                                    <td>{x.projectName}</td>
                                    <td>{x.totalUnConfirmSize} / {x.totalFileSize}</td>
                                    <td>Column content</td>
                                </tr>
                            ))

                        ): (<></>)}

                        {/*<tr>*/}
                        {/*    <th scope="row">Default</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-primary">*/}
                        {/*    <th scope="row">Primary</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-secondary">*/}
                        {/*    <th scope="row">Secondary</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-success">*/}
                        {/*    <th scope="row">Success</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-danger">*/}
                        {/*    <th scope="row">Danger</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-warning">*/}
                        {/*    <th scope="row">Warning</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-info">*/}
                        {/*    <th scope="row">Info</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-light">*/}
                        {/*    <th scope="row">Light</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        {/*<tr className="table-dark">*/}
                        {/*    <th scope="row">Dark</th>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*    <td>Column content</td>*/}
                        {/*</tr>*/}
                        </tbody>
                    </table>
                </div>
                <div className={styles.right}>
                    {IsThereAdmin ? (
                            <ProjectUpload/>
                        ) :
                        (
                            <a><img src={"lockDataManagement.png"}/></a>
                        )}
                </div>


            </div>
            <div className={styles.footer}>푸터</div>

        </main>
    );
};

