import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GoBackButton from "../../components/goBackButton";
import AddServicesForm from "./addServices";
import { selectUser } from "../../slices/userSlice";

export default function VendorServicesPage() {
    const user = useSelector(selectUser)
    const [services, setServices] = useState(null)

    useEffect(()=> {
        async function fetchVendorServices() {
            const response = await fetch(`http://localhost:5000/vendor/${user._id}`);
            const data = await response.json();
            setServices(data.services)
        }
        fetchVendorServices()
    }, [user._id])
    return (
        <div>
            <GoBackButton />
            <AddServicesForm />
            <hr/>
            <div>
                <p className='text-xl text-center my-6'>Current Services</p>
                <ul>
                    {services && services.map((service, i) => (
                        <li key={i}>
                            <div className="border rounded-xl w-3/4 mx-auto my-4 p-4 text-center">
                                <p>{service.serviceName}</p>
                                <p>{service.serviceDescription}</p>
                                <p>${service.price}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}