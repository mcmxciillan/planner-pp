import { useParams } from "react-router-dom"
import GoBackButton from "../../components/goBackButton";
import { useEffect, useState } from "react";

export default function VendorDetails() {
    const { vendorId } = useParams();
    const [vendor, setVendor] = useState(null);

    useEffect(() => {
        async function fetchVendorDetails() {
            const response = await fetch(`http://localhost:5000/vendor/${vendorId}`);
            const data = await response.json();
            console.log(data)
            setVendor(data);
        }
        fetchVendorDetails()
    }, [vendorId])

    return (
        <div>
            <GoBackButton />
            {vendor && <div>
                <p className='text-center font-bold'>{vendor.name}</p>
                <p className='text-center'>Rating: {vendor.rating}</p>
                <p className='text-center'>{vendor.address.street}, {vendor.address.zipcode}</p>
                {vendor.services.length > 0 ? <ul>
                    {vendor.services.map((service, i) => (
                        <li key={i}>
                            <div className="border rounded-xl w-3/4 mx-auto my-4 p-4 text-center">
                                <p>{service.serviceName}</p>
                                <p>{service.serviceDescription}</p>
                                <p>${service.price}</p>
                            </div>
                        </li>
                    ))}
                </ul> : <p className="my-2 underline font-bold text-center">This vendor is not offering services yet!</p>}
            </div>}
        </div>
    )
}