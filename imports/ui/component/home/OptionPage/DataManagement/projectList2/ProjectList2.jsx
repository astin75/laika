import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import {useTracker} from "meteor/react-meteor-data";
import styles from "./ProjectList2.module.css"
import {Meteor} from "meteor/meteor";
import {projectCollection} from "../../../../../../db/collections";

import {TextInput, Button, PasswordInput, Image,
    Text, Highlight} from '@mantine/core';


export default function ProjectList2() {
    const user = useTracker(() => Meteor.user());
    const projectList = useTracker(() => projectCollection.find({}).fetch());
    const [IsThereAdmin, setIsThereAdmin] = useState(false);

    const onDelete = (project) => {
        let oops = projectCollection
            .find({projectName: project.projectName})
            .fetch();
        projectCollection.remove(oops[0]._id);
    };


    useEffect(() => {
        if (user !== undefined) {
            if (user.profile["rank"] === "admin") {
                setIsThereAdmin(true);
            }
        }
    }, [user]);
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.topMenu}>
                    <Button className={styles.topMenuButton} variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}
                            component={Link} to="/projectManagementPage"
                    >프로젝트 관리</Button >
                    <Button className={styles.topMenuButton}  variant="gradient" gradient={{ from: 'grape', to: 'pink', deg: 35 }}
                            component={Link} to="/projectManagementPage"
                    >계정 관리</Button >
                </div>

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
                        projectList.map((x) => (
                            <tr className="table-active">
                                <th scope="row"></th>
                                <td>{x.projectName}</td>
                                {/*이값을*/}
                                <td>
                                    {x.totalUnConfirmSize} / {x.totalFileSize}
                                </td>
                                <td>
                                    <Link
                                        to={{
                                            pathname: "/labelingPage",
                                            search: `?projectName=${x.projectName}`,
                                        }}
                                    >
                                        이동하기
                                    </Link>
                                    {IsThereAdmin ? (
                                        <button
                                            type="submit"
                                            className="btn btn-danger"
                                            onClick={() => onDelete(x)}
                                        >
                                            삭제하기
                                        </button>
                                    ) : (
                                        <></>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <></>
                    )}
                    </tbody>
                </table>
            </div>
        </main>
    );
};