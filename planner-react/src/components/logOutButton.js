/**
* The LogOutButton component is responsible for rendering a button that, when clicked,
* logs the user out of the application by dispatching the clearJWT and logUserOut
* actions from the sessionSlice of the Redux store, and navigates the user back to the home page.
* @returns {JSX.Element} - A button element that, when clicked, logs the user out and navigates to the home page.
*/
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearJWT, logUserOut } from "../slices/sessionSlice";
export default function LogOutButton() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div>
            <button onClick={() => {
                dispatch(clearJWT())
                dispatch(logUserOut())
                navigate('/')
                }}>{`Log Out`}</button>
        </div>
    )
}