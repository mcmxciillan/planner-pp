import { Link } from "react-router-dom"

export const WhenButton = () => {
    return (
        <div className="bg-pp-green text-black font-bold py-2 px-4 rounded">
            <Link to={'/when'}>When?</Link>
        </div>
    )
}