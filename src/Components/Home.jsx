import React from 'react'
import Sidebar from './Sidebar'
import Chat from './Chat'
import './Home.scss'

function Home() {
  return (
    <div className='home'>
        <Sidebar/>
        <Chat/>
    </div>
  )
}

export default Home