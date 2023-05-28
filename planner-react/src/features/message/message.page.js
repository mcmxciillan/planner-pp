import Message from "./message.component";
import { selectEvents } from "../../slices/eventsSlice";
import { useSelector } from "react-redux";
import GoBackButton from "../../components/goBackButton";

export default function MessagePage() {

    const events = useSelector(selectEvents)
    console.log(events)
    // const messages = events.map(event => event.message)

    // TODO: For each event a user has
        // Render a button link that takes you to the message thread for that event
        // The message thread should be a list of messages
        // Each message should have a timestamp and a message body
        // The message thread should have a text input and a button to send a message
        // The message thread should have a button to go back to the events page
    return (
        <div>
            <GoBackButton />
        </div>
    )
}