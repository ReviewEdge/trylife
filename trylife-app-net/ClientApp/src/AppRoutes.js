import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { AddClient } from './components/AddClient';

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/addclient',
    element: <AddClient />
  },
  // {
  //   path: '/fetch-data',
  //   element: <FetchData />
  // }
];

export default AppRoutes;
