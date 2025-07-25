import { lazy } from "react";

import { type RouteObject } from "react-router-dom";
import React from "react";
import { ROUTES } from "../constants/routes";

const MainContent = lazy(() => import( '../pages/MainContent/MainContent')); 
const PersonalAccount = lazy(() => import('../features/PersonalAccount/PersonalAccount')); 
const Catalog = lazy(() => import('../features/Catalog/Catalog'));
const Favourites = lazy(() => import('../features/Favourites/Favourites')); 
const PastOrders = lazy(() => import('../features/PastOrders/PastOrders')); 
const Orders = lazy(() => import('../features/PastOrders/components/Orders/Orders')); 
const Purchases = lazy(() => import('../features/PastOrders/components/Products/Purchases'));
const Faq = lazy(() => import('../pages/article_footer/Faq')); 
const Cart = lazy(() => import('../features/Cart/Cart')); 
const CreateOrder = lazy(() => import('../features/CreateOrder/CreateOrder')); 
const ProductPage = lazy(() => import('../features/ProductPage/ProductPage')); 
const Contacts = lazy(() => import('../pages/article_footer/Contacts'));  
const Vacancies = lazy(() => import('../pages/article_footer/Vacancies')); 
const About = lazy(() => import('../pages/article_footer/About')); 
const Supplier = lazy(() => import('../pages/article_footer/Supplier')); 
const Shops = lazy(() => import('../pages/article_footer/Shops')); 
const Delivery = lazy(() => import('../pages/article_footer/Delivery')); 
const ThanksOrder = lazy(() => import('../features/CreateOrder/ThanksOrder')); 
const NotFound = lazy(() => import('../pages/NotFound/NotFound')); 


import { Navigate } from "react-router-dom";

export const routes: RouteObject[] = [
  {
    path: ROUTES.main,
    element: React.createElement(MainContent),
  },
  {
    path: ROUTES.account,
    element: React.createElement(PersonalAccount),
  },
  {
    path: ROUTES.catalog,
    element: React.createElement(Catalog),
  },
  {
    path: ROUTES.cart,
    element: React.createElement(Cart),
  },
  {
    path: ROUTES.createOrder,
    element: React.createElement(CreateOrder),
  },
  {
    path: ROUTES.thanks,
    element: React.createElement(ThanksOrder),
  },
   {
    path: ROUTES.favourites,
    element: React.createElement(Favourites),
  },
  {
    path: ROUTES.productItem,
    element: React.createElement(ProductPage),
  },
  {
    path: ROUTES.about,
    element: React.createElement(About),
  },
  {
    path: ROUTES.contacts,
    element: React.createElement(Contacts),
  },
  {
    path: ROUTES.delivery,
    element: React.createElement(Delivery),
  },
  {
    path: ROUTES.faq,
    element: React.createElement(Faq),
  },
  {
    path: ROUTES.shopsAdress,
    element: React.createElement(Shops),
  },
  {
    path: ROUTES.vacancies,
    element: React.createElement(Vacancies),
  },{
    path: ROUTES.supplier,
    element: React.createElement(Supplier),
  },
  {
    path: ROUTES.shopping,
    element: React.createElement(PastOrders),
    children: [
      {
      index: true,
      element: React.createElement(Navigate, {to: ROUTES.orders, replace: true}),
      },
      {
        path: ROUTES.orders,
        element: React.createElement(Orders),
      },
      {
        path: ROUTES.purchases,
        element: React.createElement(Purchases),
      },
    ],
  },

  {
    path: "*",
    element: React.createElement(NotFound)
  }
];


