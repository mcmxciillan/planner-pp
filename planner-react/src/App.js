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
import MessagePage from './features/message/message.page';
import RatingPage from './features/rating/rating.page';
import VendorEventsPage from './features/event/vendorEvents.page';
import WhatForm from './features/search/what/form';
import WhereForm from './features/search/where/form';
import WhoForm from './features/search/who/form';
import WhenForm from './features/search/when/form';
import WhyForm from './features/search/why/form';
import HowPage from './features/search/how/page';
import WhoResults from './features/search/who/results';
import VendorServicesPage from './features/vendor/services';
import EventDetails from './features/event/eventDetails';
import VendorDetails from './features/vendor/vendorDetails';
import EditEvent from './features/event/editEvent';

export default function App() {

  const userLoggedIn = useSelector(selectUserLoggedIn)
  const user = useSelector(selectUser)
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={userLoggedIn ? <HomePage user={user}/> : <LandingPage/>}/>
        <Route exact path="/signup" element={<SignUpPage/>} />
        <Route exact path="/login" element={<LogInPage/>} />
        <Route exact path="/vendorSignup" element={<VendorSignupPage/>}/>
        <Route exact path="/home/:userId" element={<HomePage/>} />
        <Route exact path="/vendor/:vendorId" element={<VendorDetails />}/>
        <Route exact path="/vendor/services" element={<VendorServicesPage />}/>
        <Route exact path="/event/:eventId" element={<EventDetails />} />
        <Route exact path="/event/edit/:eventId" element={<EditEvent />} />
        <Route exact path="/events" element={<CreateEventPage/>} />
        <Route exact path="/events/what" element={<WhatForm/>} />
        <Route exact path="/events/where" element={<WhereForm/>} />
        <Route exact path="/events/who" element={<WhoForm/>} />
        <Route exact path='/who/results' element={<WhoResults/>} />
        <Route exact path="/events/when" element={<WhenForm/>} />
        <Route exact path="/events/why" element={<WhyForm/>} />
        <Route exact path="/events/how" element={<HowPage/>} />
        <Route exact path="/events/user/:userId" element={<EventsPage/>} />
        <Route exact path="/events/vendor/:vendorId" element={<VendorEventsPage/>} />
        <Route exact path="/messages" element={<MessagePage/>} />
        <Route exact path="/ratings/vendor/:vendorId" element={<RatingPage/>} />
        <Route exact path="/events/:userId/messages/:threadId" element={<></>} />
        <Route exact path="/profile/:userId" element={<></>} />
        <Route element={<ErrorPage/>} />
      </Routes>
  </Router>
  );
}
