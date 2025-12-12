import { useEffect, useState, useRef } from 'react'
import Typed from 'typed.js'

const TypedEffect = () =>{
const typedRef = useRef(null)
const typedInstance = useRef(null)

useEffect(()=>{
 typedInstance.current = new Typed(typedRef.current,{
    strings: [
        "Hi There!!", 
        "Welcome to Spelling Quiz", 
        "BEE!!!!"
    ],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1500,
    showCursor: true,
    cursorChar: '|',
    loop: true,
 })

 return() =>{
    // destroy instance on unmount
      if (typedInstance.current) typedInstance.current.destroy()
    }
},[])

// typedRef will be inside an inline element style applied via CSS class
  return <span ref={typedRef} className='text-center d-block fw-bold'></span>

}

export default TypedEffect