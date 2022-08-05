import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import { FormEvent, useState } from 'react';
import useAdminAuth from '../../hooks/adminAuth';
import { addCourse, fetchAdmin, handleAdminLogout } from '../../shared/helper/axios';
import { sendToast } from '../../shared/helper/toastify';
import { CourseSchema, Subtopic } from '../../shared/models/index';
import 'react-toastify/dist/ReactToastify.css';
import slugify from 'slugify';
import LogoutIcon from '../../components/dashboard/sidenavigation/icons/logout';
import { deleteCookie, getCookie } from 'cookies-next';
import Router from 'next/router';

const style = {
  container: `bg-gray-100 h-screen overflow-hidden relative`,
  main: `h-screen overflow-auto pb-36 pt-4 px-2 md:pb-8 lg:px-4`,
  mainContainer: `flex flex-col h-screen pl-0 w-full lg:pl-24 lg:space-y-4`,
};

const AdminDashboard: NextPage = () => {
  useAdminAuth();
  const [subtopic, setSubtopic] = useState<Subtopic[]>([]);

  const addSubTopic = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = {
      subname: (event.currentTarget.elements[0] as HTMLInputElement).value,
      description: (event.currentTarget.elements[1] as HTMLInputElement).value,
      youtubeLink: (event.currentTarget.elements[2] as HTMLInputElement).value,
      githubLink: (event.currentTarget.elements[3] as HTMLInputElement).value,
      date: (event.currentTarget.elements[4] as HTMLInputElement).value,
    };
    setSubtopic((subtopic): any => [...subtopic, formData]);
    event.currentTarget.reset();
  };

  const AdminLogout = async () => {
    try {
      const token = getCookie('accessToken');
      const data = await fetchAdmin(token!);
      await handleAdminLogout(data.data.email);
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      Router.push('/');
    } catch (error: any) {
      console.log(error);
      sendToast(error.response.data.message || 'Something went wrong', 'warn');
      console.log('error', error.message);
    }
  };

  const AddCourse = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      const formData = {
        topicName: (event.currentTarget.elements[0] as HTMLInputElement).value,
        price: (event.currentTarget.elements[1] as HTMLInputElement).valueAsNumber,
        description: (event.currentTarget.elements[2] as HTMLInputElement).value,
        imageURL: (event.currentTarget.elements[3] as HTMLInputElement).value,
      };
      const slug = slugify(formData.topicName);
      const course: CourseSchema = {
        data: subtopic,
        slug: slug,
        name: formData.topicName,
        price: formData.price,
        imageURL: formData.imageURL,
        description: formData.description,
      };
      const res = await addCourse(course);
      if (res.message === 'Success') {
        await sendToast('Course added successfully', 'success');
      }
    } catch (error: any) {
      sendToast(error.response.data.message || 'Something went wrong', 'warn');
      console.log(error);
    }
  };

  return (
    <>
      <ToastContainer />

      <div className="sm:flex sm:flex-col sm:items-center min-h-screen bg-gradient-to-r from-background to-bg-blue">
        <button
          className="lg:absolute md:absolute sm:mt-4 top-5 right-4 rounded-full p-4 w-[125px] flex items-center justify-center bg-primary hover:text-primary-orange text-bold text-white hover:-translate-y-1 transition duration-500 ease-in-out"
          onClick={AdminLogout}
        >
          <LogoutIcon />
          <h1>Logout</h1>
        </button>
        <div>
          <form
            className="flex flex-col justify-center items-center text-primary min-w-full "
            onSubmit={AddCourse}
            method="POST"
          >
            <h2 className="font-black text-5xl pb-2 mt-10">
              Add Course<span className="text-primary-orange">.</span>
            </h2>
            <h3 className="mb-9 text-slate-600">DataLync</h3>
            <div className="flex flex-col items-center  w-2/3 sm:w-1/3 ">
              <input
                className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
                name="topic"
                placeholder="Topic"
                id="topic-input"
              />
              <input
                className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
                name="price"
                type="number"
                placeholder="Price"
                id="price-input"
              />
              <input
                className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
                name="description"
                placeholder="Description"
                id="description-input"
              />
              <input
                className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
                name="imageurl"
                placeholder="Image URL"
                id="image-url"
              />
            </div>
            <button
              className="mt-10 mb-5 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
        h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
              type="submit"
              id="add-course-button"
            >
              Add Course
            </button>
          </form>

          <form
            className="flex flex-col justify-center items-center text-primary min-w-full "
            onSubmit={addSubTopic}
            method="POST"
          >
            <input
              className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
              name="subtopic"
              placeholder="Subtopic"
              id="subtopic-input"
            />
            <input
              className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
              name="description"
              placeholder="Description"
              id="description-input"
            />
            <input
              className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
              name="youtubeLink"
              placeholder="Youtube Link"
              id="youtube-link"
            />
            <input
              className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
              name="githubLink"
              placeholder="Github Link"
              id="github-link"
            />
            <input
              className="mt-4 pl-4 border border-slate-600 text-md w-[360px]
                          bg-dark-background active:border-primary focus:text-primary-orange rounded-xl h-12 active:drop-shadow-xl focus:shadow-black
                          focus:outline-none focus:border-primary
                          focus:ring-1 focus:ring-primary focus:bg-elevated"
              name="date"
              placeholder="Date (DD-MM-YYYY)"
              id="date"
            />
            <button
              className="my-10 rounded-xl bg-primary min-w-[150px] text-xl hover:-translate-y-1 transition duration-500 ease-in-out hover:bg-primary-orange
        h-12 hover:shadow-md hover:shadow-primary-500/40 text-white"
              type="submit"
              id="add-subtopic-button"
            >
              Add Subtopic
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
