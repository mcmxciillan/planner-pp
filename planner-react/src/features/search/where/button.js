import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectWhere } from "../../../slices/newEventSlice"

export const WhereButton = () => {
    const { street, zipcode } = useSelector(selectWhere)

    function whereButtonLabel() {
        if (street !== null && zipcode !== null) {
            return <span>&#x2713;</span>
        } else {
            return "Where?"
        }
    }
    return (
        <div className="bg-pp-orange bg-opacity-50 border border-black w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/where'}>{whereButtonLabel()}</Link>
        </div>
    )
}