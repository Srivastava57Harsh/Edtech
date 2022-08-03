import useAuth from '../hooks/useAuth';
import { CourseSchema } from '../shared/models';
import Link from 'next/link';
import { FE_URL } from '../config';

const BuyCourseCard: React.FC<CourseSchema> = prop => {
  return (
    <div className="absolute top-[150px] right-[75px] max-w-sm  shadow-xl bg-gray-200 border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={prop.imageURL} alt="course image" />
      </a>

      <div className="flex flex-col justify-center items-center px-5 pb-5">
        <span className="ml-[-230px] mt-8 text-4xl font-bold text-black">₹{prop.price}</span>
        <a
          href={'/courses/' + prop._id!}
          className="text-white bg-primary hover:text-primary-orange hover:-translate-y-1 transition duration-500 ease-in-out focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-md py-2.5 text-center  dark:focus:orange-800 px-[70px] m-8  text-xl"
        >
          Buy Now
        </a>
      </div>
    </div>
  );
};

export default BuyCourseCard;
