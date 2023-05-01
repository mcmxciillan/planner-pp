import { Link } from "react-router-dom"

export const WhereButton = () => {
    return (
        <div className="bg-pp-orange bg-opacity-50 border border-black w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/where'}>Where?</Link>
        </div>
    )
}