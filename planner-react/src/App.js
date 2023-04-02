import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ErrorPage from './features/error/error.page';
import LandingPage from './features/landing/landing.page';
import SignUpPage from './features/signup/signup.page';
import LogInPage from './features/login/login.page';
import HomePage from './features/home/home.page';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from './slices/sessionSlice';
import { selectUser } from './slices/userSlice';
import CreateEventPage from './features/event/createEvent.page';
import EventsPage from './features/event/events.page';
import VendorSignupPage from './features/signup/vendorSignup/vendorSignup.page';
import Navbar from './components/navbar';


export default function App() {

  const userLoggedIn = useSelector(selectUserLoggedIn)
  const user = useSelector(selectUser)
  console.log("User logged in?: ", userLoggedIn)
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={userLoggedIn ? <HomePage user={user}/> : <LandingPage/>}/>{/* Need to figure out how to pass the User ID into the home page URL*/}
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
