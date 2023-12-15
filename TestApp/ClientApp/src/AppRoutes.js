import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { AddClient } from './components/AddClient';
import AddProduct from "./components/AddProduct";

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
    path: '/addproduct',
    element: <AddProduct />
  }
];

export default AppRoutes;
