import SideNavigation from '../../components/dashboard/sidenavigation';
import TopNavigation from '../../components/dashboard/topnavigation';
import CourseCard from '../../components/CourseCard';
import { ToastContainer } from 'react-toastify';
import { getOwnedCourses } from '../../shared/helper/axios';
import * as cookie from 'cookie';
import { CourseSchema } from '../../shared/models';
import { deleteCookie } from 'cookies-next';

const style = {
  container: `bg-gray-100`,
  main: `pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col pl-0 w-full lg:space-y-4`,
};

interface CoursesArray {
  courseData: CourseSchema[];
}

const MyCourses = ({ courseData }: CoursesArray) => {
  return (
    <>
      <ToastContainer />
      <div className={style.container}>
        <div className="flex items-start">
          <SideNavigation mobilePosition="right" />
          <div className={style.mainContainer}>
            <h1 className="absolute top-6 md:top-8 z-50 pl-[40px] text-primary font-bold text-xl md:text-3xl">
              My Courses
            </h1>
            <TopNavigation />
            <div className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-10">
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

export async function getServerSideProps(context: any) {
  try {
    var token = cookie.parse(context.req.headers.cookie)['accessToken'];
    const coursesRes: any = await getOwnedCourses(token);
    const courseData = coursesRes.data;
    return { props: { courseData } };
  } catch (error) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    console.log(error);
    return {
      redirect: {
        permanent: false,
        destination: '/login',
      },
    };
  }
}

export default MyCourses;
