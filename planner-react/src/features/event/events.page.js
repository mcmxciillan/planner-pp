import { useParams } from "react-router-dom";
import GoBackButton from "../../components/goBackButton";

export default function EventsPage() {
    const { userId } = useParams()

    return(
        <div>
            <GoBackButton/>
            <ul>
                <li><button>Event</button></li>
                <li><button>Event</button></li>
                <li><button>Event</button></li>
            </ul>
        </div>
    )
}