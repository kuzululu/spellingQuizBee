import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'
import SpellingQuiz from '../shared/components/SpellingQuiz'
import TypedEffect from '../shared/components/TypingEffect'

const HomePage = () =>{
 return(
    <>
     <Helmet>
      <title>Spelling Quiz | Home</title>
    </Helmet>

    <section className='mt-4'>
      <div className='container'>
         <div className='row'> 
            <div className='col-md-12 col-lg-12'>
               <h1 className='text-light position-absolute'><TypedEffect /></h1>
            </div>
         </div>

         <div className='row mt-4'>
            <div className='col-md-12 col-lg-12'>
               <SpellingQuiz />
            </div>
         </div>
      </div>
    </section>

    </>
 )
}

export default HomePage