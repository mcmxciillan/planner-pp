import Home from "./home.component";
import { selectUser } from "../../slices/userSlice";
import { useSelector } from "react-redux";
import VendorHome from "./vendorHome.component";

export default function HomePage() {
    const user = useSelector(selectUser)

    if (user.roles.includes("Vendor")) {
        return (
            <div>
                <VendorHome />
            </div>
        )
    } else {
        return (
            <div>
                <Home />
            </div>
        )
    }
}