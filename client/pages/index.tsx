import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Navbar from '../components/home/navbar';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import NextJsCarousel from '../components/home/heroslider';
import { getDashboardCourses } from '../shared/helper/axios';
import { CourseSchema } from '../shared/models';
import CourseCard from '../components/CourseCard';
import Footer from '../components/home/footer';
import { useEffect } from 'react';
import { getCookie } from 'cookies-next';
import Router from 'next/router';

interface CoursesArray {
  courseData: CourseSchema[];
}

const Hero = ({ courseData }: CoursesArray) => {
  useEffect(() => {
    if (getCookie('accessToken')) {
      Router.push('/user/dashboard');
    }
  }, []);
  return (
    <>
      <Navbar />
      <NextJsCarousel />
      <h2 className="font-black text-4xl mx-4 md:mx-8 mt-[90px] pl-2">Recommended Courses</h2>
      <hr className="w-[20vw] border-b-[1vh] border-primary-orange ml-[40px]" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 mt-10 ">
        {courseData.map(course => (
          <div className="m-10">
            <CourseCard {...course} key={course.slug} />
          </div>
        ))}
      </div>
      <Footer />;
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
