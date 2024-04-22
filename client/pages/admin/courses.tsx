import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDashboardCourses } from '../../shared/helper/axios';
import { CourseSchema } from '../../shared/models';
import { deleteCookie } from 'cookies-next';
import useAdminAuth from '../../hooks/adminAuth';
import AdminCourseCard from '../../components/AdminCourseCard';

const style = {
  container: `bg-gray-100`,
  main: `pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col pl-0 w-full lg:space-y-4`,
  heading: `text-3xl font-bold text-center my-8`, // Styles for heading
};

interface CoursesArray {
  courseData: CourseSchema[];
}

const Dashboard = ({ courseData }: CoursesArray) => {
  useAdminAuth();
  return (
    <>
      <ToastContainer />
      <div className={style.container}>
        <div className="flex items-start">
          <div className={style.mainContainer}>
            {/* Styled Heading */}
            <h1 className={style.heading}>LIST OF COURSES</h1>

            <div className="bg-gray-100 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 p-10">
              {courseData.map(course => (
                <div className="m-10">
                  <AdminCourseCard {...course} key={course.slug} />
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
    console.log('new');
    const coursesRes = await getDashboardCourses();
    const courseData = coursesRes.courses;
    console.log('CourseList', courseData);
    return { props: { courseData } };
  } catch (error) {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
    console.log(error);
  }
}

export default Dashboard;
