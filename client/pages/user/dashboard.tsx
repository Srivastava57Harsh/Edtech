import { NextPage } from 'next';
import SideNavigation from '../../components/dashboard/sidenavigation';
import TopNavigation from '../../components/dashboard/topnavigation';
import DashboardProvider from '../../components/dashboard/provider/context';
import Overlay from '../../components/dashboard/provider/overlay';
import CourseCard from '../../components/CourseCard';
import useAuth from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDashboardCourses } from '../../shared/helper/axios';
import { CourseSchema } from '../../shared/models';

const style = {
  container: `bg-gray-100 h-screen overflow-hidden relative`,
  main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4`,
};
interface CoursesArray {
  courseData: CourseSchema[];
}
const Dashboard = ({ courseData }: CoursesArray) => {
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 cards ml-40 mt-10 absolute top-20">
          {courseData.map(course => (
            <div className="m-10">
              <CourseCard {...course} key={course.slug} />
            </div>
          ))}
        </div>
      </DashboardProvider>
    </>
  );
};

export async function getServerSideProps() {
  try {
    const coursesRes: any = await getDashboardCourses();
    const courseData = coursesRes.courses;
    return { props: { courseData } };
  } catch (error) {
    console.log(error);
  }
}

export default Dashboard;
