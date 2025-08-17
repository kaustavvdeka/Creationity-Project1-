import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet, useLocation } from 'react-router-dom'

function Layout() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Header/>
      <Outlet />
      {isHomePage && <Footer />}
    </>
  )
}

export default Layout