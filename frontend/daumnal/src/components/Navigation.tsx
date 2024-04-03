import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  { name: '캐릭터 소개', path: '/character-intro', color: '#F4BEBE', image: '/image/navbar_tree.png', width: '26px', height: '29px'},
  { name: '일기 보기', path: '/calendar', color: '#B5C0D0', image: '/image/navbar_calendar.png', width: '26px', height: '29px'},
  { name: '일기 쓰기', path: '/create-diary', color: '#CCD3CA', image: '/image/navbar_creatediary.png', width: '26px', height: '30px' },
  { name: '노래 듣기', path: '/playlist', color: '#F8D2B2', image: '/image/navber_playlistlist.png', width: '21px', height: '27px' },
  { name: '설정', path: '/setting', color: '#EED3D9', image: '/image/navbar_setting.png', width: '26px', height: '26px' },
];

const Navigation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getBackgroundColor = (index: number) => {
    const activePath = navigationItems[index]?.path;
    const isPlaylistPage = location.pathname === '/playlistpage';
    const isActive = location.pathname === activePath || 
      (location.pathname === '/monthly-result' && activePath === '/calendar') ||
      (location.pathname === '/select-character' && activePath === '/create-diary') ||
      (location.pathname === '/music-result' && activePath === '/create-diary');
    return isActive ? navigationItems[index]?.color : 'rgba(0,0,0,0)';
  };

  const isClickable = !(location.pathname === '/' || location.pathname.startsWith('/oauth'));

  const navigateToMain = () => {
    navigate('/main');
  };

  return (
        <nav className="h-screen flex justify-center items-center">
            <div className="flex w-[150px] h-screen fixed top-0 right-0">
                <div className=" w-16 h-screen flex flex-col justify-center">
                  {navigationItems.map((_, index) => (
                    <div className="h-20" key={index} style={{backgroundColor: getBackgroundColor(index) }}></div>
                  ))}
                </div>
                <div className="flex flex-grow h-screen justify-between items-center bg-bg_nav flex-col"> {/* flex-col 추가 */}
                  {/* 로고 이미지를 상단에 위치시키는 div */}
                  <div className="flex justify-center items-center p-2 " style={{flexGrow: 0}}>
                    <img src="./image/logo.png" alt="메인" style={{ cursor: isClickable ? 'pointer' : 'default' }} onClick={() => isClickable && navigateToMain()} />
                  </div>
                  {/* 기존 내비게이션 아이템들의 위치를 유지 */}
                  <div className='w-full'>
                    {navigationItems.map((item) => (
                        <NavItem
                            data={{ name: item.name, address: item.path, color: item.color, image: item.image, width: item.width, height : item.height }}
                            key={item.path}
                            clickable={isClickable}
                        />
                    ))}
                  </div>
                  <div className="flex justify-center items-center p-2 invisible" style={{flexGrow: 0}}>
                    <img src="./image/logo.png" alt="메인" style={{ cursor: 'pointer' }} onClick={navigateToMain} />
                  </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
