import Router, { useRouter } from 'next/router';
import { getCourse } from '../../../shared/helper/axios';
import { CourseSchema } from '../../../shared/models';
import 'react-toastify/dist/ReactToastify.css';
import * as cookie from 'cookie';
import TopNavigation from '../../../components/dashboard/topnavigation';
import BuyCourseCard from '../../../components/BuyCourseCard';
import useAuth from '../../../hooks/useAuth';
import HomeIcon from '../../../components/dashboard/sidenavigation/icons/home';
import { deleteCookie } from 'cookies-next';

interface CoursesArray {
  courseData: CourseSchema;
}

const CoursePage = ({ courseData }: CoursesArray) => {
  const style = {
    container: `bg-black h-screen overflow-hidden relative`,
    main: `h-screen overflow-auto pb-36 pt-4 md:pb-8`,
    mainContainer: `flex flex-col h-screen pl-0 w-full`,
  };
  const ShowCourse = () => {
    if (courseData.data) {
      return (
        <>
          <div className="p-10 bg-primary text-white">
            <h1 className="font-black text-2xl">Description</h1>
            <h1 className="pt-4 text-lg md:w-[50vw]">{courseData.description}</h1>
          </div>

          <div className="p-10">
            <h1 className="font-black text-2xl">Subtopics</h1>
            <ol className="list-decimal m:pl-10 pt-4">
              {courseData.data.map(subtopic => {
                const paramString = subtopic.youtubeLink.split('?')[1];
                const queryString = new URLSearchParams(paramString);
                const videoID = queryString.get('v');
                return (
                  <div className="p-4">
                    <li className="font-bold text-xl">{subtopic.subname}</li>
                    <div className="pt-2">
                      <p>{subtopic.description}</p>
                    </div>
                    <div className="p-8">
                      <button
                        onClick={() => window.open(`${subtopic.githubLink}`, '_blank')}
                        className="ml-[-30px]  p-4 bg-primary text-white rounded-full text-md flex items-center justify-center hover:bg-primary-orange"
                      >
                        <svg
                          className="w-8 h-8 fill-white hover:fill-primary"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 496 512"
                        >
                          <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                        </svg>
                        <span className="pl-4">GitHub</span>
                      </button>
                    </div>
                    <div className="pt-4 w-[250px] sm:w-[300px] md:w-[400px] xl:w-[600px] h-[180px] sm:h-[200px] md:h-[300px] xl:h-[400px] ">
                      <iframe
                        width="100%"
                        height="100%"
                        title={`${subtopic.subname}`}
                        frameBorder="0"
                        src={`https://www.youtube.com/embed/${videoID}`}
                      ></iframe>
                    </div>
                  </div>
                );
              })}
            </ol>
          </div>
        </>
      );
    }
    return (
      <>
        <div className="p-10 bg-primary text-white">
          <h1 className="font-black text-2xl">Description</h1>
          <h1 className="pt-4 text-lg md:w-[50vw]">{courseData.description}</h1>
        </div>
        <div className="p-10">
          <h1 className="font-black text-2xl md:w-[50vw]">To access the course, Kindly purchase it.</h1>
        </div>
      </>
    );
  };

  return (
    <>
      <div className={style.mainContainer}>
        <button
          className="flex absolute md:top-7 top-5 right-[100px] z-50"
          onClick={() => {
            {
              courseData.data ? Router.push('/user/dashboard') : Router.push('/');
            }
          }}
        >
          <HomeIcon /> <p className="">Home</p>
        </button>
        <TopNavigation {...{ title: courseData.name }} />
        <div className="flex p-10 bg-gray-100 sm:justify-center sm:p-10 lg:p-0 md:p-0">
          <BuyCourseCard {...courseData} key={courseData.slug} />
        </div>
        {ShowCourse()}
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  try {
    if (!context.req.headers.cookie) {
      const coursesRes: any = await getCourse(context.params.id);
      const courseData = coursesRes.data.courseDetails;
      return { props: { courseData } };
    }
    var token = cookie.parse(context.req.headers.cookie)['accessToken'];
    try {
      const coursesRes: any = await getCourse(context.params.id, token);
      const courseData = coursesRes.data.courseDetails;
      return { props: { courseData } };
    } catch (error) {
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
      
    }
  } catch (error) {
    console.log(error);
  }
}

export default CoursePage;
