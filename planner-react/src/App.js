import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './features/error/error.page';
import LandingPage from './features/landing/landing.page';
import SignUpPage from './features/signup/signup.page';
import LogInPage from './features/login/login.page';
import HomePage from './features/home/home.page';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from './features/session/sessionSlice';


function App() {

  const userLoggedIn = useSelector(selectUserLoggedIn)
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={userLoggedIn ? <HomePage/> : <LandingPage/>}/>
        <Route exact path="/signup" element={<SignUpPage/>} />
        <Route exact path="/login" element={<LogInPage/>} />
        <Route exact path="/home/:userId" element={<HomePage/>} />
        <Route element={<ErrorPage/>} />
      </Routes>
  </Router>
  );
}

export default App;
