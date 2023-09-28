import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import LayoutMain from './pages/Layouts/LayoutMain';
import Home from './pages/Home/Home';
import Movie from './pages/Movie/Movie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/movie/:id',
        element: <Movie />
      },
    ]
  },
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
