import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './features/error/error.page';
import LandingPage from './features/landing/landing.page';
import SignUpPage from './features/signup/signup.page';
import LogInPage from './features/login/login.page';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<LandingPage/>} />
        <Route exact path="/signup" element={<SignUpPage/>} />
        <Route exact path="/login" element={<LogInPage/>} />
        <Route element={<ErrorPage/>} />
      </Routes>
  </Router>
  );
}

export default App;
