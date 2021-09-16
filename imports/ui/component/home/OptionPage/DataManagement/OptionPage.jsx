import React, { useEffect, useState } from "react";
import styles from "./OptionPage.module.css";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";

import ProjectUpload from "./projectUpload/ProjectUpload";

import { projectCollection } from "../../../../../db/collections";

export const OptionPage = () => {
  const user = useTracker(() => Meteor.user());
  const projectList = useTracker(() => projectCollection.find({}).fetch());
  const [IsThereAdmin, setIsThereAdmin] = useState(false);

  const onDelete = (project) => {
    let oops = projectCollection
      .find({ projectName: project.projectName })
      .fetch();
    console.log(oops[0]._id);
    projectCollection.remove(oops[0]._id);
  };

  const onMove = () => {
    console.log(22222);
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
                projectList.map((x) => (
                  <tr className="table-active">
                    <th scope="row"></th>
                    <td>{x.projectName}</td> {/*이값을*/}
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
        <div className={styles.right}>
          {IsThereAdmin ? (
            <ProjectUpload />
          ) : (
            <a>
              <img src={"lockDataManagement.png"} />
            </a>
          )}
        </div>
      </div>
      <div className={styles.footer}>푸터</div>
    </main>
  );
};
