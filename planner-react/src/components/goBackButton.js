import { useNavigate } from "react-router-dom";

export default function GoBackButton() {

    const navigate = useNavigate();

    return (
        <div>
            <button onClick={() => navigate(-1)}>{`<`}</button>
        </div>
    )
}