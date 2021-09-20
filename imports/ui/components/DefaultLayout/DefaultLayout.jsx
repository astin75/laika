import React from 'react'
import Footer from 'ui/components/Footer'
import Header from 'ui/components/Header'

import ScrollTop from '../../module/scroll-top/index.js'
// @ts-ignore
import styles from './DefaultLayout.module.css'

const DefaultLayout = ({ children }) => {
  return (
    <div className={styles.defaultLayout}>
      <div className={styles.inner}>
        <Header />
        <ScrollTop />
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  )
}

export default DefaultLayout
