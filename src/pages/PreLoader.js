import React, { useEffect } from 'react'
import '../styles/PreLoader.css'
import { preLoaderAnim } from '../components/animation'
import logo from '../assets/logo.png'

const PreLoader = () => {
    
    useEffect (()=>{
        preLoaderAnim();
    })
  return (
    <div className='preloader'>
        <div className='texts-container'>
            <span>Revotion</span>
            <span style={{
              color:"#33c0cb"
            }}>Rule</span>
            <span>Engine</span>
        </div>
    </div>
  )
}

export default PreLoader
