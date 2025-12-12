import { useState, useEffect, useRef } from 'react'
import { Routes, Route} from 'react-router-dom'

import RootLayout from './shared/layouts/RootLayout'

import HomePage from './pages/Home'
import Page404 from './pages/Page404'

import AOS from 'aos'

function App() {

useEffect(()=>{
 AOS.init({ duration: 1000 })
},[])

  return (
    <>
     <Routes>
      <Route element={<RootLayout />}>
        <Route path='/' element={<HomePage />} />
      </Route>
      <Route path='*' element={<Page404 />} />
     </Routes>
    </>
  )
}

export default App
