import { Link } from 'react-router-dom'

const Footer = () =>{

return (
<>

<footer id="footer" className="text-center text-lg-start text-white">
  
  <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
    
    <div className="me-5 d-none d-lg-block">
      <span>Get connected with us on social networks:</span>
    </div>

    
    <div id='social-icons'>
      <a href='https://www.facebook.com/jeffronald.gamasan' target='_blank' className="me-4 text-primary">
        <i className="fab fa-facebook-f"></i>
      </a>
      
      <a href="viber://chat?number=+639452869822" target='_blank' className='me-4 text-primary-emphasis'>
        <i className="fab fa-viber"></i>
      </a>
      
      <a href='#' target='_blank' className="me-4 text-warning-emphasis">
        <i className="fab fa-google"></i>
      </a>
     
      <a href='https://www.linkedin.com/in/jeff-ronald-gamasan-684563215/' target='_blank' className="me-4 text-info">
        <i className="fab fa-linkedin"></i>
      </a>
      <a href='#' target='_blank' className="me-4 text-dark ">
        <i className="fab fa-github"></i>
      </a>
    </div>
    
  </section>
  
  <section>
    <div className="container text-center text-md-start mt-5">
    
      <div className="row mt-3">
        
        <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-4">
          
          <h6 className="text-uppercase fw-bold mb-4 animate__animated animate__fadeIn animate__infinite infinite">
            <p className='fs-1 text-center'>jrgg</p>
          </h6>
          <p>
            Here you can use rows and columns to organize your footer content. Lorem ipsum
            dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        

        
        <div className="col-md-4 col-lg-4 col-xl-2 mx-auto mb-4">

          <h6 className="text-uppercase fw-bold mb-4">
            SKILLS+
          </h6>
          <p>
            <Link className="text-reset">HTML-CSS, JS, BS5</Link>
          </p>
          <p>
            <Link className="text-reset">ReactJS</Link>
          </p>
          <p>
            <Link className="text-reset">PHP+MySQL</Link>
          </p>
          <p>
            <Link className="text-reset">Laravel, CodeIgniter</Link>
          </p>
        </div>

        
        <div className="col-md-4 col-lg-4 col-xl-3 mx-auto mb-md-0 mb-4">

          <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
          <p><i className="fas fa-home me-3"></i> Las Pinas City, 1742, NCR, Philippines</p>
          <p>
            <i className="fas fa-envelope me-3"></i>
            jeffgamasan@gmail.com
          </p>
          <p><i className="fab fa-viber me-3"></i> <a className='text-light' href="viber://chat?number=+639452869822">0945 2869 822</a></p>
          <p><i className="fas fa-phone-alt me-3"></i> <a className='text-light' href="tel:+939452869822">0945 2869 822</a></p>
        </div>
        
      </div>
    
    </div>
  </section>
 
   <div className="text-center p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }} >
    {/* get a dynamic full year */}
    © {new Date().getFullYear()} Copyright: <a className="text-reset fw-bold animate__animated animate__fadeIn animate__infinite	infinite" href="https://mdbootstrap.com/" target="_blank" rel="noopener noreferrer">JRGG</a> Contact Web <a href='https://www.facebook.com/jeffronald.gamasan' target='_blank' className='text-reset animate__animated animate__fadeIn animate__infinite'>Master</a>
  </div>

</footer>

</>
)

}

export default Footer