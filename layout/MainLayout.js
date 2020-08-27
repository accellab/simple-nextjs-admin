import SideMenu from '../layout/SideMenu';

const MainLayout = ({ children }) => {
  return (
    <div className='main__layout--container'>
      <div className='main__layout--side-menu'>
        <SideMenu />
      </div>
      <div className='main__layout--content'>{children}</div>
    </div>
  );
};

export default MainLayout;
