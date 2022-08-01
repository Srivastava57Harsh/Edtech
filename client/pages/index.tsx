import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../components/home/navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NextJsCarousel from '../components/home/heroslider';
import { getDashboardCourses } from '../shared/helper/axios';
import { CourseSchema } from '../shared/models';
import CourseCard from '../components/CourseCard';

interface CoursesArray {
  courseData: CourseSchema[];
}

const Hero = ({ courseData }: CoursesArray) => {
  return (
    <>
      <Navbar />
      <NextJsCarousel />

      <h1>Recommended</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 cards ml-40 mt-10 ">
        {courseData.map(course => (
          <div className="m-10">
            <CourseCard {...course} key={course.slug} />
          </div>
        ))}
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

export default Hero;
