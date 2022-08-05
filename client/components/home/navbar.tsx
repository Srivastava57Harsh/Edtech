import { useState } from 'react';
import Link from 'next/link';
import logoTech from '../public/Logotech.png';
import Image from 'next/image';
import Dropdown from './dropdown';
import { MenuIcon } from '@heroicons/react/outline';

const Navbar = () => {
  const [drop, setDrop] = useState(false);

  const [visibility, setVisibility] = useState('hidden');
  const [bgColor, setBgColor] = useState('transparent');

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setVisibility('hidden');
      if (bgColor === 'transparent' && window.scrollY > 50) setBgColor('backdrop-blur-md bg-white/5');
      if (window.scrollY < 50) setBgColor('transparent');
    });
  }

  return (
    <div className={`${bgColor}  w-full z-50 mt-[20px] border-b-4`}>
      <nav className=" p-1 mb-2 z-[99] w-full bg-transparent ">
        <div className="navmenu flex justify-between ">
          <div className="max-w-[350px]">
            <h2 className="font-black text-5xl mx-4 md:mx-8">
              DataLync<span className="text-primary-orange">.</span>
            </h2>
            <h3 className=" text-slate-600 mx-[19px] md:mx-[34px] font-semibold">Learn with technology</h3>
          </div>
          <div className="md:block hidden">
            <div style={{ position: 'fixed', marginLeft: '-12vw', zIndex: 1 }}>
              <ul className="space-x-8 flex font-bold ml-[-80px] xl:ml-0 mt-4">
                <Link href="/signup">
                  <a>
                    <li className="text-orange-500 transition-all duration-150 transform hover:scale-105 hover:underline">
                      SIGNUP
                    </li>
                  </a>
                </Link>
                <Link href="/login">
                  <a>
                    <li className="text-orange-500 duration-150 transform text-blacktransition-all hover:scale-105 hover:underline">
                      LOGIN
                    </li>
                  </a>
                </Link>
              </ul>
            </div>
          </div>
          <div className="flex flex-col text-orange-500 font-semibold md:hidden">
            <MenuIcon
              color="orange"
              onClick={() => {
                setDrop(!drop);
              }}
              className="transition-all delay-100 duration-400 cursor-pointer h-10 w-10 md:hidden mt-2 mr-4"
            />
            <div
              className="absolute z-[100] -ml-32 top-20 right-4"
              onClick={() => {
                setDrop(!drop);
              }}
            >
              {drop ? <Dropdown /> : null}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
