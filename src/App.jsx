import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './components/layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import About from './pages/about/About';
import PageNotFound from './components/PageNotFound';
import Bus from './pages/bus/Bus';
import Detail from './pages/bus/Detail';
import Checkout from './pages/checkout/Checkout';
import UserLogin from './pages/auth/User/UserLogin';
import UserResetPassword from './pages/auth/User/UserResetPassword';
import UserSignUp from './pages/auth/User/UserSignUp';
import PassResetLink from './pages/auth/User/PassResetLink';
import AdminLogin from './pages/auth/Admin/AdminLogin';
import AdminPassResetLink from './pages/auth/Admin/AdminPassResetLink';
import AdminResetPassword from './pages/auth/Admin/AdminResetPassword';
import AdminSignUp from './pages/auth/Admin/AdminSignUp';
import AdminHomePage from './pages/admin/AdminHomePage';
import Protect from './components/security/Protect';
import TicketDownload from './pages/ticket/TicketDownload';
import ScrollToTop from './components/scrollToTop/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/*--------------- Routes with Nav -------------------*/}
        <Route element={<MainLayout />}>
          {/* Landing and General Pages */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<About />} />

          {/* bus pages */}
          <Route path="/bus" element={<Bus />} />
          <Route path="/bus/bus-details" element={<Detail />} />
          <Route path="/bus/bus-details/checkout" element={<Protect role="user"><Checkout /></Protect>} />
          <Route path="/bus/bus-details/checkout/ticket" element={<Protect role="user"><TicketDownload /></Protect>} />
        </Route>
        {/*---------------------------------------------------*/}

        {/* user authentication */}
        <Route path="/userAuth" element={<UserLogin />} />
        <Route path="/user-reset-password" element={<UserResetPassword />} />
        <Route path="/usersignup" element={<UserSignUp />} />
        <Route path="/reset-link" element={<PassResetLink />} />

        {/* admin authenticaton & general pages */}
        <Route path="/adminAuth" element={<AdminLogin />} />
        <Route path="/admin-reset-link" element={<AdminPassResetLink />} />
        <Route path="/admin-reset-password" element={<AdminResetPassword />} />
        <Route path="/admin-signup" element={<AdminSignUp />} />
        <Route path="adminAuth/admin-home-page" element={<Protect role="admin"><AdminHomePage /></Protect>} />

        {/* Catch-All Route */}
        <Route path="*" element={<PageNotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
