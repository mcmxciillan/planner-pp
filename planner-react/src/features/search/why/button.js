import { Link } from "react-router-dom"

export const WhyButton = () => {
    return (
        <div className="bg-pp-purple text-black font-bold py-2 px-4 rounded">
            <Link to={'/why'}>Why?</Link>
        </div>
    )
}