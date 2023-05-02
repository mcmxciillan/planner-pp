import { useSelector } from "react-redux";
import GoBackButton from "../../../components/goBackButton";
import { selectNewEvent } from "../../../slices/newEventSlice";

export default function HowPage() {
    const newEvent = useSelector(selectNewEvent)

    return (
        <div>
            <GoBackButton />
            <p>New Event Created! Confirmation:</p>
            <div>
                <p>{newEvent.name}</p>
                <p>{newEvent.address.street}</p>
                <p>{newEvent.date}</p>
            </div>
        </div>
    )
}