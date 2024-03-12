// Navigation.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem'; // NavItem 컴포넌트를 import
// import './Navigation.css'; // 추가된 CSS 파일

interface NavItem {
  name: string;
  path: string;
}

const navigationItems: NavItem[] = [
  { name: 'Calendar', path: '/calendarpage' },
  { name: 'CreateDiary', path: '/creatediarypage' },
  { name: 'Playlist', path: '/playlistpage' },
  { name: 'Setting', path: '/settingpage' },
];

const Navigation: React.FC = () => {

  return (
    <nav className="h-screen flex justify-center items-center border border-black ">
        <div className="">
          {navigationItems.map((item) => (
            <NavItem
              data={{ name: item.name, address: item.path }}
              key={item.path}
              
            />
          ))}
        </div>
    </nav>
  );
};

export default Navigation;
