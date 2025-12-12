import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';

const RootLayout = () =>{
return(
  <>
   <Outlet />
   <Footer />
  </>
 )
}

export default RootLayout
