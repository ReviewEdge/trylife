import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import { AddClient, ClientForm } from './components/AddClient';
import {AddProduct, ProductForm } from "./components/AddProduct";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/addclient',
    element: <AddClient />,
    element: <ClientForm />
  },
  {
    path: '/addproduct',
    element: <AddProduct />,
    element: <ProductForm />
  }
];

export default AppRoutes;
