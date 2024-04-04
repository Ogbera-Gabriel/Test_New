import './App.css';
import {  Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home/homePage';
import SignUpPage from './pages/SignUp/signUpPage';
import SignInPage from './pages/SignIn/signInPage';

function App() {
  return (
    <div>
      <Routes>
         <Route path='/' element={<HomePage />}/>
         <Route path='/signup' element={<SignUpPage />}/>
         <Route path='/signin' element={<SignInPage />}/>
      </Routes>
    </div>
  )
}

export default App
