import Message from "./message.component";
import { selectUser } from "../session/sessionSlice";
import { useSelector } from "react-redux";

export default function MessagePage() {

    const { events } = useSelector(selectUser)
    const messages = events.map(event => event.message)

    // TODO: For each event a user has
        // Render a button link that takes you to the message thread
    return(
        <div>
            <ul>
                {messages.map(message => (
                    <Message/>
                ))}
            </ul>
        </div>
    )
}