import { useParams } from "react-router-dom";
import GoBackButton from "../../components/goBackButton";

export default function VendorEventsPage() {
    const { vendorId } = useParams()

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