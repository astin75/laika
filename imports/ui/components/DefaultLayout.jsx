import React from 'react'

import ScrollTop from '../module/scroll-top/index.js'
import Header from 'ui/components/Header'
import Footer from 'ui/components/Footer'

const DefaultLayout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <ScrollTop />
      <Footer />
    </React.Fragment>
  )
}

export default DefaultLayout
