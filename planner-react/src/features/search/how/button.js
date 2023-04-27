import { Link } from "react-router-dom"

export const HowButton = () => {
    return (
        <div className="bg-pp-pink text-black font-bold py-2 px-4 rounded">
            <Link to={'/how'}>How -&gt;</Link>
        </div>
    )
}