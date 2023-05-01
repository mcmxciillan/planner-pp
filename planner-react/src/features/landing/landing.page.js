/**
 * The LandingPage component displays the sign up and log in links.
 * Clicking on these links will navigate the user to the corresponding pages.
 */
import { Link } from "react-router-dom"

export default function LandingPage() {
    return (
        <div>
            <div className="flex justify-center mb-6">
                <h1 className="">{`{{{{{{ Planner++ }}}}}}`}</h1>
            </div>
            <div className="flex justify-center my-2">
                <Link to="/signup" className="text-center border py-1 px-2 rounded-full mx-auto  w-1/4">Sign Up</Link>
            </div>
            <div className="flex justify-center my-2">
                <Link to="/login" className="text-center border py-1 px-2 rounded-full mx-auto  w-1/4">Log In</Link>
            </div>
        </div>
    )
}