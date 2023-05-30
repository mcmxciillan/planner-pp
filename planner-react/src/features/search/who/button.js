import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectWho } from "../../../slices/newEventSlice"

export const WhoButton = () => {
    const { organizer } = useSelector(selectWho)

    function whoButtonLabel() {
        if (organizer !== null) {
            return <span>&#x2713;</span>
        } else {
            return "Who?"
        }
    }
    
    return (
        <div className="bg-pp-yellow bg-opacity-50 border border-black w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/who'}>{whoButtonLabel()}</Link>
        </div>
    )
}