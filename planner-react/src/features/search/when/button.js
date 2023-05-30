import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectWhen } from "../../../slices/newEventSlice"
export const WhenButton = () => {
    const { date, startTime } = useSelector(selectWhen)

    function whenButtonLabel() {
        if (date !== null && startTime !== null) {
            return <span>&#x2713;</span>
        } else {
            return "When?"
        }
    }
    return (
        <div className="bg-pp-green bg-opacity-50 border border-black w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/when'}>{whenButtonLabel()}</Link>
        </div>
    )
}