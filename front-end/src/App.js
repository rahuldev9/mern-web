import './App.css';
import Nav from './Components/Nav';
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import Addproduct from './Components/Addproduct';
import ProductList from './Components/ProductList';
import Updateproduct from './Components/Updateproduct';
import Home from './Components/Home';
import Profile from './Components/Profile';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';


import { BrowserRouter, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>
        <Route path='/home' element={<Home/>}></Route>
        <Route element={<PrivateComponent/>}>
        <Route path='/products' element={<ProductList/>}></Route>
        <Route path='/add' element={<Addproduct/>}></Route>
        <Route path='/update/:id' element={<Updateproduct/>}></Route>
        <Route path='/logout' element={<h1>logout</h1>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        </Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
      {/* <Footer/> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
