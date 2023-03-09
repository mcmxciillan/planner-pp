import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { clearJWT, logUserOut } from "../features/session/sessionSlice";

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