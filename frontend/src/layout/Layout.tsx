import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { AppAlert, AppBarApp } from '@src/components';

const Layout: FC = () => {
  return (
    <>
      <AppBarApp />
      <AppAlert />
      <Outlet />
    </>
  );
};

export default Layout;
