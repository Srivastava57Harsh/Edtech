import { useState } from 'react';
import { CourseSchema } from '../shared/models';
import Router from 'next/router';
import { deleteCourse } from '../shared/helper/axios';

const AdminCourseCard: React.FC<CourseSchema> = prop => {
  const description = prop.description.substring(0, 65);

  const handleDeleteCourse = async () => {
    try {
      console.log('id', prop._id);
      const response = await deleteCourse(prop._id!);
      console.log('Course deleted successfully:', response);

      Router.reload();
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  return (
    <>
      <div className="rounded-lg shadow-m bg-gray-200">
        <img className="rounded-t-lg" src={prop.imageURL} alt="" />

        <div className="p-5">
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">{prop.name}</h5>

          <p className="mb-3 text-xl text-gray-700 font-bold">₹{prop.price}</p>
          <p className="mb-3 font-normal text-gray-500">{description}&nbsp;. . . . . .</p>

          <button
            onClick={handleDeleteCourse}
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-red-600 bg-red-200 rounded-lg hover:bg-red-300 focus:ring-4 focus:outline-none"
          >
            Delete
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminCourseCard;
