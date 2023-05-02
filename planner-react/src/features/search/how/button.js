import { Link, useNavigate } from "react-router-dom"
import { addEvent } from "../../../slices/eventsSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectNewEvent } from "../../../slices/newEventSlice";

export const HowButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const newEvent = useSelector(selectNewEvent)
    console.log(newEvent)

    async function createNewEvent() {
        console.log("Creating new event...")
        try {
            const response = await fetch('http://localhost:5000/events', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEvent)
            });
            const data = await response.json();
            dispatch(addEvent(data));
            console.log("Event created!")
            navigate('/events/how')
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-pp-pink bg-opacity-50 border border-black mt-8 w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <button onClick={() => createNewEvent()}>How -&gt;</button>
        </div>
    )
}