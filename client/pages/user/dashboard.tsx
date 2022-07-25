import { NextPage } from 'next';
import SideNavigation from '../../components/dashboard/sidenavigation';
import TopNavigation from '../../components/dashboard/topnavigation';
import DashboardProvider from '../../components/dashboard/provider/context';
import Overlay from '../../components/dashboard/provider/overlay';
import CourseCard from '../../components/CourseCard';
import useAuth from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  container: `bg-gray-100 h-screen overflow-hidden relative`,
  main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4`,
};

const dashboard: NextPage = () => {
  useAuth();
  return (
    <>
      <ToastContainer />

      <DashboardProvider>
        <div className={style.container}>
          <div className="flex items-start">
            <Overlay />
            <SideNavigation mobilePosition="right" />
            <div className={style.mainContainer}>
              <TopNavigation />
            </div>
          </div>
        </div>
        <div>
          <CourseCard />
        </div>
      </DashboardProvider>
    </>
  );
};

export default dashboard;
