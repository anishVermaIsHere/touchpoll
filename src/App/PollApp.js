import '../assets/styles/PollApp.css'
import React from 'react'
import Container from '../components/container/Container'
import NavBar from '../components/header/NavBar'
import Footer from '../components/footer/Footer'
import AlertBox from '../utils/widgets/AlertBox'


const PollApp = (props) => {
  return (
    <div className='app-container'>
      <NavBar
        handleDrawerToggle={props.handleDrawerToggle}
        mobileOpen={props.mobileOpen}
        signOut={props.signOut}
      />
      <AlertBox />
      <Container />
      <Footer />
    </div>
  )
}

export default PollApp