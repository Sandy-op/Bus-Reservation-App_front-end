import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import InfoMessage from '../../pages/home_container/infoMsg/InfoMessage';

const PlainLayout = () => {
  return (
    <main className="w-full min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-300 flex flex-col">
      <InfoMessage />
      <Outlet />
      <Footer/>
    </main>
  );
};

export default PlainLayout;
