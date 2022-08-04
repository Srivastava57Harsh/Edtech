import Link from 'next/link';
import Router, { useRouter } from 'next/router';

import data from './data';
import { useToggle } from '../provider/context';

import LogoutIcon from './icons/logout';
import { deleteCookie, getCookie } from 'cookies-next';
import { fetchUser } from '../../../shared/helper/axios';
import { handleLogout } from '../../../shared/helper/axios';

const style = {
  title: `mx-4 text-sm`,
  inactive: `text-white`,
  active: `font-medium text-primary-orange hover:primary-orange`,
  link: `flex items-center justify-start my-2 p-4 w-full text-white hover:text-primary-orange hover:-translate-y-1 transition duration-500 ease-in-out`,
  close: `lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all`,
  open: `lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto`,
};

export default function SidenavItems() {
  const { asPath } = useRouter();
  const logout = async () => {
    try {
      const token = getCookie('accessToken');
      const data = await fetchUser(token);
      console.log('data', data.data.email);
      await handleLogout(data.data.email);
      deleteCookie('accessToken');
      deleteCookie('refreshToken');
      Router.push('/login');
    } catch (error) {
      console.log('error', error.message);
    }
  };

  return (
    <>
      <ul className="flex flex-col items-center">
        <div>
          <li>
            {data.map(item => (
              <button
                onClick={() => {
                  Router.push(item.link);
                }}
                className={`${style.link}`}
              >
                {item.icon}
              </button>
            ))}
          </li>
        </div>
      </ul>
      <div className="flex absolute bottom-10 w-[100%] m-0 items-center justify-center">
        <button className="hover:fill-primary-orange" onClick={logout}>
          <LogoutIcon />
        </button>
      </div>
    </>
  );
}
