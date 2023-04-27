import { Link } from "react-router-dom"

export const WhoButton = () => {
    return (
        <div className="bg-pp-yellow text-black font-bold py-2 px-4 rounded">
            <Link to={'/who'}>Who?</Link>
        </div>
    )
}