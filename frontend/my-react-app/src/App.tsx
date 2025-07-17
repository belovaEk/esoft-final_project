import '/src/assets/styles/App.css'
import Header from "./Header/Header"
import MainContent from "./MainContent/MainContent"
import Footer from './Footer/Footer'
import PersonalAccount from './PersonalAccount/PersonalAccount'
import Catalog from './Catalog/Catalog'
import Favourites from './Favourites/Favourites'
import Faq from './article_footer/Faq'

import { Shops } from './article_footer/Shops'
import Contacts from './article_footer/Contacts'
import Vacancies from './article_footer/Vacancies'
import About from './article_footer/About'
import Supplier from './article_footer/Supplier'
import Delivery from './article_footer/Delivery'
import Shopping from './Shopping/Shopping'
import Orders from './Shopping/Orders'
import Purchases from './Favourites/Purchases'
import ProductPage from './ProductPage/ProductPage'
import Cart from './Cart/Cart'
import Order from './MakingOrder/Order'
import ThanksOrder from './MakingOrder/ThanksOrder'

import { ROUTES } from './constants/routes'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Прокрутка вверх при изменении пути
  }, [pathname]);

  return null;
}

function App() {

  return (
    <>
    
    <Router>
      <ScrollToTop />
      <Header />
      <Routes>
      <Route path={ROUTES.main} element={<MainContent />} />
      <Route path={ROUTES.account} element={<PersonalAccount />} />
      <Route path={ROUTES.catalog} element={<Catalog />}/>
      <Route path={ROUTES.favourites} element={<Favourites />}/>
      <Route path={ROUTES.shopping} element={<Shopping/>}>
        <Route path={ROUTES.orders} element={<Orders/>} />
        <Route path={ROUTES.purchases} element={<Purchases/>} />
        <Route index element={<Orders/>} />
      </Route>
      <Route path={ROUTES.faq} element={<Faq/>}/>
      <Route path={ROUTES.cart} element={<Cart />}/>
      <Route path={ROUTES.createOrder} element={<Order />}/>

      <Route path={ROUTES.productItem} element={<ProductPage />}/>

      <Route path={ROUTES.contacts} element={<Contacts />} />
      <Route path={ROUTES.vacancies} element={<Vacancies />} />
      <Route path={ROUTES.about} element={<About />} />
      <Route path={ROUTES.supplier} element={<Supplier />}/>
      <Route path={ROUTES.shopsAdress} element={<Shops />}/>
      <Route path={ROUTES.delivery} element={<Delivery />}/>
      <Route path={ROUTES.thanks} element={<ThanksOrder />}/>

    </Routes>
    <Footer />

    </Router>
    </>
  )
}

export default App
