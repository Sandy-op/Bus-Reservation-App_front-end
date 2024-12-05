import { Outlet } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

const MainLayout = () => {
  return (
    <>
      <NavBar />
      <main className='w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col overflow-hidden'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
