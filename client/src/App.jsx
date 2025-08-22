import{BrowserRouter,Routes,Route} from 'react-router-dom'
//import './App.css'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  

  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={ <Home />}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/signin' element={<SignIn />} />

      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
