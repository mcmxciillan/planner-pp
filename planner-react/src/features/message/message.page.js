import Message from "./message.component";
import { selectEvents } from "../../slices/eventsSlice";
import { useSelector } from "react-redux";
import GoBackButton from "../../components/goBackButton";

export default function MessagePage() {

    const events = useSelector(selectEvents)
    console.log(events)
    // const messages = events.map(event => event.message)

    // TODO: For each event a user has
        // Render a button link that takes you to the message thread
    return(
        <div>
            <GoBackButton />
            {/* <ul>
                {messages.map(message => (
                    <Message />
                ))}
            </ul> */}
        </div>
    )
}