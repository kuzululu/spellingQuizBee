import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"

const Page404 = () => {
  return (
    <>

     <Helmet>
      <title>No Page</title>
    </Helmet>

     <div className="container mt-3">
       <div className="row">
          <div className="col-md-12 col-lg-12"> 
		     <h1 className="text-center text-light text-uppercase fw-bolder">Page 404 Not Found</h1>
         <center><Link to="/" className="text-warning fw-bolder text-center">Back to Home Page</Link></center>
		  </div>
       </div>
     </div>
    </>

  )
}

export default Page404
