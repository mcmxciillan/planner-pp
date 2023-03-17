import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './features/error/error.page';
import LandingPage from './features/landing/landing.page';
import SignUpPage from './features/signup/signup.page';
import LogInPage from './features/login/login.page';
import HomePage from './features/home/home.page';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from './features/session/sessionSlice';
import CreateEventPage from './features/event/createEvent.page';
import EventsPage from './features/event/events.page';
import VendorSignupPage from './features/signup/vendorSignup/vendorSignup.page';


function App() {

  const userLoggedIn = useSelector(selectUserLoggedIn)
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={userLoggedIn ? <HomePage/> : <LandingPage/>}/>{/* Need to figure out how to pass the ID into the home page */}
        <Route exact path="/signup" element={<SignUpPage/>} />
        <Route exact path="/login" element={<LogInPage/>} />
        <Route exact path="/vendorSignup" element={<VendorSignupPage/>}/>
        <Route exact path="/home/:userId" element={<HomePage/>} />
        <Route exact path="/events" element={<CreateEventPage/>} />
        <Route exact path="/events/:userId" element={<EventsPage/>} />
        <Route exact path="/events/:userId/messages" element={<></>} />
        <Route exact path="/events/:userId/messages/:threadId" element={<></>} />
        <Route exact path="/event/:eventId" element={<></>} />
        <Route exact path="/profile/:userId" element={<></>} />
        <Route element={<ErrorPage/>} />
      </Routes>
  </Router>
  );
}

export default App;