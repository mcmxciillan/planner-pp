/**
 * The LandingPage component displays the sign up and log in links.
 * Clicking on these links will navigate the user to the corresponding pages.
 */
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div>
            <Link to="/signup">Sign Up</Link>
            <Link to="/login">Log In</Link>
        </div>
    )
}