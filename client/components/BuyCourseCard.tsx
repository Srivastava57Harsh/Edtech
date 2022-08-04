import useAuth from '../hooks/useAuth';
import displayRazorpay from '../shared/helper/handleRazorpay';
import { CourseSchema } from '../shared/models';

const BuyCourseCard: React.FC<CourseSchema> = prop => {
  var purchased = false;
  if (prop.data) {
    purchased = true;
  }

  return (
    <div className="lg:absolute md:absolute top-[150px] right-[75px] lg:w-[350px] md:w-[250px] shadow-xl bg-gray-200 border-gray-700 rounded lg:rounded-none md:rounded-none">
      <img className="object-cover lg:w-[350px] md:w-[250px]" src={prop.imageURL} alt="course image" />

      <div className="flex flex-col lg:w-[350px] md:w-[200px] justify-center items-center px-5 pb-5">
        <span className="ml-[0px] lg:ml-[-200px] md:ml-[-75px] mt-8 text-4xl font-bold text-black">₹{prop.price}</span>

        <button
          className={`px-[10px] focus:ring-4 focus:outline-none focus:ring-blue-300 py-2.5 text-center  dark:focus:orange-800 lg:px-[100px] md:px-[10px] sm:px-[12px] m-8 border-2 border-primary ${
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
