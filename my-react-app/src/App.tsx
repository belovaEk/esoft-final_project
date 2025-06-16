import '/src/assets/styles/App.css'
import Header from "./Header"
import MainContent from "./MainContent"
import Footer from './Footer'
import Authorization from './Authorization'
import PersonalAccount from './PersonalAccount'
import Catalog from './Catalog'
import Favourites from './Favourites'
import Faq from './Faq'

import Contacts from './article_footer/Contacts'
import Vacancies from './article_footer/Vacancies'
import About from './article_footer/About'
import Supplier from './article_footer/Supplier'
import Delivery from './article_footer/Delivery'
import Shopping from './Shopping/Shopping'
import Orders from './Shopping/Orders'
import Purchases from './Shopping/Purchases'
import ProductPage from './ProductPage'
import Cart from './Cart'
import Order from './Order'
import ThanksOrder from './ThanksOrder'


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
 
  return (
    <>
    <Router>
      <Header />
      <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/auth" element={<Authorization />} />
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

      <Route path='/catalog/chay' element={<ProductPage />}/>

      <Route path="/contacts" element={<Contacts />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/about" element={<About />} />
      <Route path='/supplier' element={<Supplier />}/>
      <Route path='/delivery' element={<Delivery />}/>
      <Route path='/thanks' element={<ThanksOrder />}/>

    </Routes>
    <Footer />

    </Router>
    </>
  )
}

export default App
