import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './css/custom.css'
import 'aos/dist/aos.css'

createRoot(document.getElementById('root')).render(
   <StrictMode>
   <HelmetProvider>
    <BrowserRouter>
       <App />
    </BrowserRouter>
   </HelmetProvider>
  </StrictMode>,
)
