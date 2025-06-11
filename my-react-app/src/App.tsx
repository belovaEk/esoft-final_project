import '/src/assets/styles/App.css'
import Header from "./Header"
import MainContent from "./MainContent"
import Footer from './Footer'
import Authorization from './Authorization'
import PersonalAccount from './PersonalAccount'

function App() {
 
  return (
    <>
    <Header />
    {/* <MainContent /> */}
    <PersonalAccount/>
    <Footer />
    {/* <Authorization /> */}
    </>
  )
}

export default App
