import '/src/assets/styles/App.css'
import Header from "../Header/Header"
import Footer from '../Footer/Footer'

import ScrollToTop from '../utils/scrollToTop'
import { AppRoutes } from './appRoutes'


import { BrowserRouter as Router } from 'react-router-dom';




function App() {

  return (
    <>
    
    <Router>
      <ScrollToTop />
      <Header />
      <AppRoutes/>
    <Footer />

    </Router>
    </>
  )
}

export default App
