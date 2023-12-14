import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { ViewProducts } from "./components/ViewProducts";
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
  {
    path: '/fetch-data',
    element: <FetchData />
  },
  {
    path: '/view-products',
    element: <ViewProducts />
  }
  // {
  //   path: '/fetch-data',
  //   element: <FetchData />
  // }
];

export default AppRoutes;
