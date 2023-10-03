import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
// import Profile from './pages/Profile';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';
import ErrorPage from './pages/ErrorPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <SearchBooks />
      }, {
        path: '/saved',
        element: <SavedBooks />
      }
//    {
      //   path: '/me',
      //   element: <Profile />
      // }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
