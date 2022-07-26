import HomeIcon from './icons/home';
import MyCoursesIcon from './icons/mycourses';
import SettingsIcon from './icons/settings';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/user/dashboard',
  },
  {
    title: 'My Courses',
    icon: <MyCoursesIcon />,
    link: '/user/myCourses',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/user/settings',
  },
];

export default data;
