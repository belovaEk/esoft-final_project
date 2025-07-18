import '/src/assets/styles/App.css'
import { MainLayout } from '../layout/MainLayot';

import ScrollToTop from '../utils/scrollToTop'
import { AppRoutes } from './appRoutes'


import { BrowserRouter as Router } from 'react-router-dom';




function App() {

  return (
    <>
    <Router>
        <MainLayout>
          <ScrollToTop />
          <AppRoutes/>
        </MainLayout>
    </Router>

    </>
  )
}

export default App
