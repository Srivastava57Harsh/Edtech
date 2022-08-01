import Link from 'next/link';

const Dropdown = () => {
  return (
    <div className="relative z-50 bg-white w-full pl-[10px]">
      <ul className="relative z-100 flex flex-col items-end justify-center space-y-4 pr-1">
        <Link href="/signup">
          <a>
            <li className="transition-all duration-150 transform hover:scale-105 hover:underline mt-2 ">SIGNUP</li>
          </a>
        </Link>
        <Link href="/login">
          <a>
            <li className="transition-all duration-150 transform hover:scale-105 hover:underline mb-2">LOGIN</li>
          </a>
        </Link>
      </ul>
    </div>
  );
};

export default Dropdown;
