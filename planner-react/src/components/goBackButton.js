/**
* The GoBackButton component is responsible for rendering a button that, when clicked,
* navigates the user back to the previous page using the useNavigate hook from React Router.
@returns {JSX.Element} - A button element that, when clicked, navigates the user back to the previous page.
*/
import { useNavigate } from "react-router-dom";

export default function GoBackButton() {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}>{`<- Go Back`}</button>
        </div>
    )
}