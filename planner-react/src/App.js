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
import WhereResults from './features/search/where/results';

export default function App() {

  const userLoggedIn = useSelector(selectUserLoggedIn)
  const user = useSelector(selectUser)
  
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={userLoggedIn ? <HomePage user={user}/> : <LandingPage/>}/>
        <Route path="/signup" element={<SignUpPage/>} />
        <Route path="/login" element={<LogInPage/>} />
        <Route path="/vendorSignup" element={<VendorSignupPage/>}/>
        <Route path="/home/:userId" element={<HomePage/>} />
        <Route path="/vendor/:vendorId" element={<VendorDetails />}/>
        <Route path="/vendor/services" element={<VendorServicesPage />}/>
        <Route path="/event/:eventId" element={<EventDetails />} />
        <Route path="/event/edit/:eventId" element={<EditEvent />} />
        <Route path="/events" element={<CreateEventPage/>} />
        <Route path="/events/what" element={<WhatForm/>} />
        <Route path="/events/where" element={<WhereForm/>} />
        <Route path="/events/where/results" element={<WhereResults/>} />
        <Route path="/events/who" element={<WhoForm/>} />
        <Route path='/events/who/results' element={<WhoResults/>} />
        <Route path="/events/when" element={<WhenForm/>} />
        <Route path="/events/why" element={<WhyForm/>} />
        <Route path="/events/how" element={<HowPage/>} />
        <Route path="/events/user/:userId" element={<EventsPage/>} />
        <Route path="/events/vendor/:vendorId" element={<VendorEventsPage/>} />
        <Route path="/messages" element={<MessagePage/>} />
        <Route path="/ratings/vendor/:vendorId" element={<RatingPage/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
  </Router>
  );
}
