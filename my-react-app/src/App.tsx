import '/src/assets/styles/App.css'
import Header from "./Header"
import MainContent from "./MainContent"
import Footer from './Footer'
import Authorization from './Authorization'
import PersonalAccount from './PersonalAccount'
import Catalog from './Catalog'

import Contacts from './article_footer/Contacts'
import Vacancies from './article_footer/Vacancies'
import About from './article_footer/About'
import Supplier from './article_footer/Supplier'
import Delivery from './article_footer/Delivery'


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
      <Route path='catalog' element={<Catalog />}/>

      <Route path="/contacts" element={<Contacts />} />
      <Route path="/vacancies" element={<Vacancies />} />
      <Route path="/about" element={<About />} />
      <Route path='/supplier' element={<Supplier />}/>
      <Route path='/delivery' element={<Delivery />}/>
    </Routes>
    <Footer />

    </Router>
    </>
  )
}

export default App
