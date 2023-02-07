import './App.css';
import Navbar from './commons/navbar/Navbar';
import HomePage from './pages/home/Home';
import Details from './pages/details/Details';
import Footer from './commons/footer/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CreatePhones from './components/create/createPhones';


  
function App() {

  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage />} /> 
        <Route path='phone/:id' element={<Details></Details>} />
        <Route path='/phones' element={<CreatePhones />} />
      </Routes>
      <Footer/>
      </BrowserRouter>
  )
}

export default App
