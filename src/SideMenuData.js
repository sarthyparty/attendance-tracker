import React from 'react';
import {FcHome, FcCalendar, FcStatistics} from 'react-icons/fc';

export const SidebarData = [
  {
    title: 'Home',
    path: '/dashboard',
    icon: <FcHome />,
    cName: 'nav-text'
  },
  {
    title: 'Trackers',
    path: '/dashboard/trackers',
    icon: <FcCalendar />,
    cName: 'nav-text'
  },
  {
    title: 'Stats',
    path: '/dashboard/stats',
    icon: <FcStatistics />,
    cName: 'nav-text'
  },
];