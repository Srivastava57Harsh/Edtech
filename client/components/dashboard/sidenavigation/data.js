import HomeIcon from './icons/home';
import MyCoursesIcon from './icons/mycourses';
import SettingsIcon from './icons/settings';

const data = [
  {
    title: 'Home',
    icon: <HomeIcon />,
    link: '/dashboard',
  },
  {
    title: 'My Courses',
    icon: <MyCoursesIcon />,
    link: '/admin/my-courses',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/admin/settings',
  },
];

export default data;
