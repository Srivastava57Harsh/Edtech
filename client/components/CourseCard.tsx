import useAuth from '../hooks/useAuth';
import { CourseSchema } from '../shared/models';
import Link from 'next/link';
import { FE_URL } from '../config';
import Router from 'next/router';

const CourseCard: React.FC<CourseSchema> = prop => {
  const route = '/courses/' + prop._id!;
  const description = prop.description.substring(0, 65);
  return (
    <>
      <div className="rounded-lg shadow-m bg-gray-200 ">
        <a href="#">
          <img className="rounded-t-lg" src={prop.imageURL} alt="" />
        </a>
        <div className="p-5">
          <a href="#">
            <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">{prop.name}</h5>
          </a>
          <p className="mb-3 text-xl text-gray-700 font-bold">₹{prop.price}</p>
          <p className="mb-3 font-normal text-gray-500">{description}&nbsp;. . . . . .</p>
          <a
            onClick={() => Router.push(`${route}`)}
            href="#"
            className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-primary bg-primary-orange rounded-lg hover:bg-orange-400  focus:ring-4 focus:outline-none"
          >
            View Details
            <svg
              aria-hidden="true"
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
