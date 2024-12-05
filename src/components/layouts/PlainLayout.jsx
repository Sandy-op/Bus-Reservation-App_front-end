import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';

const PlainLayout = () => {
  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col">
      <Outlet />
      <Footer/>
    </main>
  );
};

export default PlainLayout;
