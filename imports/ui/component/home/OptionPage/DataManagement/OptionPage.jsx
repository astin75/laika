import React from 'react';
import styles from './OptionPage.module.css'

export const OptionPage = () => {
    return (

        <main className={styles.main}>
            <div className={styles.header}>헤더</div>
            <div className={styles.body}>
                <div className={styles.left}>
                    <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">Type</th>
                            <th scope="col">Column heading</th>
                            <th scope="col">Column heading</th>
                            <th scope="col">Column heading</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="table-active">
                            <th scope="row">Active</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr>
                            <th scope="row">Default</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-primary">
                            <th scope="row">Primary</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-secondary">
                            <th scope="row">Secondary</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-success">
                            <th scope="row">Success</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-danger">
                            <th scope="row">Danger</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-warning">
                            <th scope="row">Warning</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-info">
                            <th scope="row">Info</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-light">
                            <th scope="row">Light</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        <tr className="table-dark">
                            <th scope="row">Dark</th>
                            <td>Column content</td>
                            <td>Column content</td>
                            <td>Column content</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className={styles.right}>
                    <a><img src={"lockDataManagement.png"}/></a>
                </div>

            </div>
            <div className={styles.footer}>푸터</div>

        </main>
    );
};

