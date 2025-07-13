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
      <Route path="/" element={<MainContent />} />
      <Route path="/account" element={<PersonalAccount />} />
      <Route path='/catalog' element={<Catalog />}/>
      <Route path='/favourites' element={<Favourites />}/>
      <Route path='/shopping' element={<Shopping/>}>
        <Route path='orders' element={<Orders/>} />
        <Route path='purchases' element={<Purchases/>} />
        <Route index element={<Orders/>} />
      </Route>
      <Route path='/faq' element={<Faq/>}/>
      <Route path='/cart' element={<Cart />}/>
      <Route path='/order' element={<Order />}/>

      <Route path='/catalog/:id' element={<ProductPage />}/>

      <Route path="/contacts" element={<Contacts />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/about" element={<About />} />
      <Route path='/supplier' element={<Supplier />}/>
      <Route path='/shops' element={<Shops />}/>
      <Route path='/delivery' element={<Delivery />}/>
      <Route path='/thanks' element={<ThanksOrder />}/>

    </Routes>
    <Footer />

    </Router>
    </>
  )
}

export default App
