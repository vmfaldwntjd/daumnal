import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NavItem from './NavItem';

interface NavItem {
  name: string;
  path: string;
  color: string;
  image: string;
  width: string;
  height: string;
}

const navigationItems: NavItem[] = [
  { name: '일기 보기', path: '/calendarpage', color: '#B5C0D0', image: '/image/navbar_calendar.png', width: '26px', height: '29px'},
  { name: '일기 쓰기', path: '/creatediarypage', color: '#CCD3CA', image: '/image/navbar_creatediary.png', width: '26px', height: '30px' },
  { name: '노래 듣기', path: '/playlistpage', color: '#F8D2B2', image: '/image/navber_playlistlist.png', width: '21px', height: '27px' },
  { name: '설정', path: '/settingpage', color: '#EED3D9', image: '/image/navbar_setting.png', width: '26px', height: '26px' },
];

const Navigation: React.FC = () => {
  const location = useLocation();

  const getBackgroundColor = (index: number) => {
    const activePath = navigationItems[index]?.path;
    const isPlaylistPage = location.pathname === '/playlistpage';
    const isActive = location.pathname === activePath;

    if (isPlaylistPage) {
      return isActive ? navigationItems[index]?.color : '#FFFCF7';
    } else {
      return isActive ? navigationItems[index]?.color : '#EBE3D5';
    }
  };

  return (
    <nav className="h-screen flex justify-center items-center">
        <div className="flex w-[150px] h-screen fixed top-0 right-0">
            <div className="w-4 h-screen flex flex-col justify-center">
              {navigationItems.map((_, index) => (
                <div className="h-20" key={index} style={{backgroundColor: getBackgroundColor(index) }}></div>
              ))}
            </div>
            <div className="flex flex-grow h-screen justify-center items-center" style={{ backgroundColor: '#F3EEEA' }}>
              <div className='w-full'>
                {navigationItems.map((item) => (
                    <NavItem
                        data={{ name: item.name, address: item.path, color: item.color, image: item.image, width: item.width, height : item.height }}
                        key={item.path}
                    />
                ))}
              </div>
            </div>
        </div>
    </nav>
  );
};

export default Navigation;
