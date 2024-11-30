import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import LandingPage from './pages/LandingPage';
import Bus from './pages/bus/Bus';
import Detail from './pages/bus/Detail';
import Checkout from './pages/checkout/Checkout';
import UserLogin from './pages/auth/User/UserLogin';
import UserResetPassword from './pages/auth/User/UserResetPassword';
import UserSignUp from './pages/auth/User/UserSignUp';
import PassResetLink from './pages/auth/User/PassResetLink';
import Protect from './components/security/Protect';
import TicketDownload from './pages/ticket/TicketDownload';
import About from './pages/about/About';
import ScrollToTop from './components/scrollToTop/ScrollToTop';


const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <NavBar />
      <div className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/bus' element={<Bus />} />
          <Route path='bus/bus-details' element={<Detail />} />
          <Route path="bus/bus-details/checkout" element={<Protect role="user"><Checkout /></Protect>} />
          <Route path="bus/bus-details/checkout/ticket" element={<Protect role="user"><TicketDownload /></Protect>} />
          <Route path='/userAuth' element={<UserLogin />} />
          <Route path='/user-reset-password' element={<UserResetPassword />} />
          <Route path='/usersignup' element={<UserSignUp />} />
          <Route path='/reset-link' element={<PassResetLink />} />
          <Route path='/about' element={<About />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;