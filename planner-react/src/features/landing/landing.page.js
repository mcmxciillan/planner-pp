import { Link } from "react-router-dom"

export default function LandingPage() {
    // Need to do a check if the user already has a current session
    // This existing session will be used to route the user to the authenticated home page
    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
        </div>
    )
}