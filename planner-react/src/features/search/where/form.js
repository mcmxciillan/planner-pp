import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
// import { setWhere } from '../../slices/newEventSlice'
import { setWhere } from '../../../slices/newEventSlice';
import GoBackButton from '../../../components/goBackButton';

export default function WhereForm() {
    const { register, handleSubmit, formState, watch } = useForm();
    const [venues, setVenues] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        console.log(data)
        if (data.hostingOption === "myself") {
            dispatch(setWhere({address: data.streetAddress, zipcode: data.zipcode}))
            navigate(-1)
        } else {
            console.log("Searching for venues instead")
            navigate(-1)
        }
    }
    const hostingOption = watch("hostingOption");

    const handleVenueSelect = (venue) => {
        // Set the selected venue in the form data
        const selectedVenue = {
            venueName: venue.name,
            venueAddress: venue.address,
            venueRating: venue.rating
        };
        const updatedFormData = {
            ...watch(),
            selectedVenue
        };
        onSubmit(updatedFormData);
    };

    const handleVenueSearch = async (zipcode) => {
        const url = `http://localhost:5000/venue/${zipcode}`;
        try {
            const response = await fetch(url);
            const venues = await response.json();
            setVenues(venues);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <GoBackButton/>
            <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
                <p className="text-center">Where is this event going to be?</p>
                <div>
                    <div className="flex justify-center my-4">
                        <input type="radio" id="host-myself" value="myself" {...register("hostingOption")} />
                        <label className='mx-2' htmlFor="host-myself">Host it myself</label>
                    </div>
                    {hostingOption === "myself" && (
                        <>
                            <div className="flex justify-center my-4">
                                <input type="text" className='p-2 w-4/5 w-100 border rounded-lg' placeholder='Street Address' {...register("streetAddress")} />
                            </div>
                            <div className="flex justify-center my-4">
                                <input type="text" className='p-2 w-4/5 w-100 border rounded-lg' placeholder='Zip Code' {...register("zipcode")} />
                            </div>
                        </>
                    )}
                </div>
                <div className="flex justify-center my-4">
                    <input type="radio" id="host-venue" value="venue" {...register("hostingOption")} />
                    <label className='mx-2' htmlFor="host-venue">Host at a venue</label>
                </div>
                <div className="flex justify-center">
                    <button className="border py-1 px-2 rounded-full mx-auto w-1/4" type="submit">All done</button>
                </div>
            </form>
        </div>
    );
}
