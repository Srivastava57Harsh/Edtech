import useAuth from '../hooks/useAuth';
import displayRazorpay from '../shared/helper/handleRazorpay';
import { CourseSchema } from '../shared/models';

const BuyCourseCard: React.FC<CourseSchema> = prop => {
  var purchased = false;
  if (prop.data) {
    purchased = true;
  }

  return (
    // <div className="lg:absolute md:absolute top-[150px] right-[75px] lg:w-[350px] md:w-[250px] shadow-xl bg-gray-200 border-gray-700 rounded lg:rounded-none md:rounded-none">
    //   <img className="object-cover lg:w-[350px] md:w-[250px]" src={prop.imageURL} alt="course image" />

    //   <div className="flex flex-col lg:w-[350px] md:w-[200px] justify-center items-center px-5 pb-5">
    //     <span className="ml-[0px] lg:ml-[-200px] md:ml-[-75px] mt-8 text-4xl font-bold text-black">₹{prop.price}</span>

    //     <button
    //       className={`px-[10px] focus:ring-4 focus:outline-none focus:ring-blue-300 py-2.5 text-center  dark:focus:orange-800 lg:px-[100px] md:px-[10px] sm:px-[12px] m-8 border-2 border-primary ${
    //         purchased ? 'disabled text-white bg-primary' : 'text-primary bg-primary-orange hover:bg-orange-400'
    //       }`}
    //       onClick={async () => await displayRazorpay(prop._id!, prop.name)}
    //       disabled={purchased ? true : false}
    //     >
    //       {purchased ? 'Purchased' : 'Buy Now'}
    //     </button>
    //   </div>
    // </div>

    // <div className="lg:absolute md:absolute top-[150px] right-[75px] lg:w-[350px] md:w-[250px] shadow-xl max-w-s bg-gray-200 ">
    //   <a href="#">
    //     <img className="rounded-t-lg" src={prop.imageURL} alt="" />
    //   </a>
    //   <div className="p-5">
    //     <div className="flex">
    //       <div>
    //         <a href="#">
    //           <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 ">{prop.name}</h5>
    //         </a>
    //         <p className="mb-3 text-xl text-gray-700 font-bold">₹{prop.price}</p>
    //       </div>
    //       <button
    //         onClick={async () => await displayRazorpay(prop._id!, prop.name)}
    //         disabled={purchased ? true : false}
    //         className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-primary-orange rounded-lg hover:bg-orange-400  focus:ring-4 focus:outline-none"
    //       >
    //         Buy Now
    //       </button>
    //     </div>
    //   </div>
    // </div>

    <div className="md:absolute top-[150px] right-[75px] lg:w-[350px] md:w-[250px] shadow-xl bg-gray-200">
      <a href="#">
        <img className="" src={prop.imageURL} alt="product image" />
      </a>
      <div className="px-5 pb-5">
        <a href="#">
          <h5 className="text-3xl font-semibold tracking-tight text-gray-900 mt-4">{prop.name}&nbsp;Course</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>First star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Second star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Third star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fourth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <svg
            aria-hidden="true"
            className="w-5 h-5 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Fifth star</title>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
          </svg>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
            5.0
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold text-gray-900 ">₹{prop.price}</span>
          <button
            onClick={async () => await displayRazorpay(prop._id!, prop.name)}
            disabled={purchased ? true : false}
            className={` font-medium rounded-lg text-sm px-5 py-2.5 text-center   ${
              purchased ? 'disabled text-white bg-primary' : 'text-primary bg-primary-orange hover:bg-orange-400'
            }`}
          >
            {purchased ? 'Purchased' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyCourseCard;
