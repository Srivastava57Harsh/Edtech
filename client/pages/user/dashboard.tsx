import SideNavigation from '../../components/dashboard/sidenavigation';
import TopNavigation from '../../components/dashboard/topnavigation';
import CourseCard from '../../components/CourseCard';
import useAuth from '../../hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDashboardCourses } from '../../shared/helper/axios';
import { CourseSchema } from '../../shared/models';
import NextJsCarousel from '../../components/home/heroslider';
import { useEffect } from 'react';

const style = {
  container: `bg-gray-100`,
  main: `pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col pl-0 w-full lg:space-y-4`,
};

interface CoursesArray {
  courseData: CourseSchema[];
}

const Dashboard = ({ courseData }: CoursesArray) => {
  useAuth();
  return (
    <>
      <ToastContainer />
      <div className={style.container}>
        <div className="flex items-start">
          <SideNavigation mobilePosition="left" />
          <div className={style.mainContainer}>
            <TopNavigation />
            <NextJsCarousel />
            <div className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-10">
              {courseData.map(course => (
                <div className="m-10">
                  <CourseCard {...course} key={course.slug} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
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
