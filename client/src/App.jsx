import{BrowserRouter,Routes,Route} from 'react-router-dom'
//import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import VertificationPage from './pages/VertificationPage'
import ForgotPassword from './pages/ForgotPassword'
import ForgotPasswordNotification from './pages/ForgotPasswordNotification'

function App() {
  

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/vertification' element={<VertificationPage />}/>
        <Route path='/forgot-password' element= { <ForgotPassword />} />
        <Route path='/forgot-password-notification' element={ <ForgotPasswordNotification/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
