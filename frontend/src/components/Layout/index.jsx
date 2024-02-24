import React from 'react';

import { SideBar } from '../SideBar';
import { Outlet } from 'react-router-dom';

import './index.css';

export const Layout = () => {
  return (
    <div className='layout'>
      <SideBar />
      <div className='layout__content'>
        <Outlet />
      </div>
    </div>
  );
};
