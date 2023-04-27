import { Link } from "react-router-dom"

export const WhereButton = () => {
    return (
        <div className="bg-pp-orange text-black font-bold py-2 px-4 rounded">
            <Link to={'/where'}>Where?</Link>
        </div>
    )
}