import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import Layout from './components/Layout';
import Login from './components/Login';
import Signup from './components/Signup';
import Browse from './components/Browse';
import Error from './components/Error';

const appRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Error />}>
      <Route index element={<Login />} />
      <Route path='signup' element={<Signup />} />
      <Route path='browse' element={<Browse />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={appRouter} />;
};

export default App;
