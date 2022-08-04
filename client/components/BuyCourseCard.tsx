import useAuth from '../hooks/useAuth';
import displayRazorpay from '../shared/helper/handleRazorpay';
import { CourseSchema } from '../shared/models';

const BuyCourseCard: React.FC<CourseSchema> = prop => {
  var purchased = false;
  if (prop.data) {
    purchased = true;
  }

  return (
    <div className="absolute top-[150px] right-[75px] max-w-sm  shadow-xl bg-gray-200 border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={prop.imageURL} alt="course image" />
      </a>

      <div className="flex flex-col justify-center items-center px-5 pb-5">
        <span className="ml-[-230px] mt-8 text-4xl font-bold text-black">₹{prop.price}</span>

        <button
          className={` focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-md py-2.5 text-center  dark:focus:orange-800 px-[100px] m-8 border-2 border-primary ${
            purchased ? 'disabled text-white bg-primary' : 'text-primary bg-primary-orange hover:bg-orange-400'
          }`}
          onClick={async () => await displayRazorpay(prop._id!, prop.name)}
          disabled={purchased ? true : false}
        >
          {purchased ? 'Purchased' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
};

export default BuyCourseCard;