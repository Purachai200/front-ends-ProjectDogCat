import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import NotFound from '../layouts/Guest/NotFound'
import MainLayout from '../layouts/Header_Outlet/MainLayout'


import Home from '../layouts/Guest/Home'
import Recorder_Login from '../layouts/Guest/Recorder_Login'
import Admin_Login from '../layouts/Guest/Admin_Login'
import Admin_Register from '../layouts/Guest/Admin_Register'

import Recorder_Main from '../layouts/Pages/Recorder/Recorder_Main'
import Admin_Main from '../layouts/Pages/Admin/Admin_Main'

import useMock from '../hooks/useMockUp';
import AdminLayout from '../layouts/Header_Outlet/AdminLayout';
import RecorderLayout from '../layouts/Header_Outlet/RecorderLayout'

import Recorder_Register from '../layouts/Pages/Recorder/Recorder_Register';
import Recorder_UnRegister from '../layouts/Pages/Recorder/Recorder_UnRegister';
import Recorder_Location from '../layouts/Pages/Recorder/Recorder_Location';
import Recorder_Nature from '../layouts/Pages/Recorder/Recorder_Nature';

import AdminRec from '../layouts/Pages/Admin/Admin_Rec'

const guestRouter = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout/>,
    children: [
      { index: true, element: <Home/> },
      { path: 'recorder-login', element: <Recorder_Login/> },
      { path: 'admin-login', element: <Admin_Login/> },
      { path: 'admin-register', element: <Admin_Register/> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);

const adminRouter = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout/>,
    children: [
      {index: true, element: <Admin_Main/>},
      { path: 'admin-rec', element: <AdminRec /> },
      { path: '*', element: <NotFound /> }
    ],
  }
])

const recorderRouter = createBrowserRouter([
  {
    path: '/',
    element: <RecorderLayout/>,
    children: [
      {index: true, element: <Recorder_Main/>},
      { path: 'rec-regis', element: <Recorder_Register/> },
      { path: 'rec-unregis', element: <Recorder_UnRegister/> },
      { path: 'rec-location', element: <Recorder_Location/> },
      { path: 'rec-nature', element: <Recorder_Nature/> },
      { path: '*', element: <NotFound /> }
    ]
  }
])

// Comment for MockUp
// const RecorderRouter = createBrowserRouter([
//   {
//     path: '/recorder',
//     element: <MainLayout/>,
//     children: [
//       { index: true, element: <Recorder_Main/> },
//       { path: '*', element: <NotFound /> }
//     ]
//   }
// ]);

// const AdminRouter = createBrowserRouter([
//   {
//     path: '/admin',
//     element: <MainLayout/>,
//     children: [
//       { index: true, element: <Admin_Main/> },
//       { path: '*', element: <NotFound /> }
//     ]
//   }
// ]);

export default function AppRouter() {

  // use for mockup
  const { isAdmin, isRecorder } = useMock()
  console.log(isAdmin, isRecorder)

  const router = isAdmin ? adminRouter : (isRecorder ? recorderRouter : guestRouter);
  return (
    <RouterProvider router = {router} />
  )
}