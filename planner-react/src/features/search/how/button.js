import { Link } from "react-router-dom"

export const HowButton = () => {
    return (
        <div className="bg-pp-pink bg-opacity-50 border border-black mt-8 w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/how'}>How -&gt;</Link>
        </div>
    )
}