import { NextPage } from 'next';
import { useRouter } from 'next/router';
import TopNavigation from '../../components/dashboard/topnavigation';
import Navbar from '../../components/home/navbar';
import { getCourse, getDashboardCourses } from '../../shared/helper/axios';
import { CourseSchema } from '../../shared/models';

interface CoursesArray {
  courseData: CourseSchema;
}

const CoursePage = ({ courseData }: CoursesArray) => {
  const router = useRouter();
  const { id } = router.query;
  const style = {
    container: `bg-gray-100 h-screen overflow-hidden relative`,
    main: `h-screen overflow-auto pb-36 pt-4 md:pb-8`,
    mainContainer: `flex flex-col h-screen pl-0 w-full`,
  };

  return (
    <>
      <div className={style.mainContainer}>
        <TopNavigation {...{ title: courseData.name }} />
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    const coursesRes: any = await getCourse(context.params.id); //change api call to get single course
    const courseData = coursesRes.courses;
    return { props: { courseData } };
  } catch (error) {
    console.log(error);
  }
}

export default CoursePage;
