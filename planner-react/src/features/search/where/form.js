import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setWhere } from '../../slices/eventSlice'

export default function WhereForm() {
    const { register, handleSubmit, formState, watch } = useForm();
    const [venues, setVenues] = useState([]);
    const onSubmit = (data) => console.log(data);

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
        <form onSubmit={handleSubmit(onSubmit)}>
        <div>
            <input type="radio" id="host-myself" value="myself" {...register("hostingOption")} />
            <label htmlFor="host-myself">Host it myself</label>
            {hostingOption === "myself" && (
            <>
                <div>
                <label htmlFor="streetAddress">Street Address</label>
                <input type="text" id="streetAddress" {...register("streetAddress")} />
                </div>
                <div>
                <label htmlFor="zipcode">Zipcode</label>
                <input type="text" id="zipcode" {...register("zipcode")} />
                </div>
            </>
            )}
        </div>
        <div>
            <input type="radio" id="host-venue" value="venue" {...register("hostingOption")} />
            <label htmlFor="host-venue">Host at a venue</label>
            {hostingOption === "venue" && (
            <div>
                <label htmlFor="venueZipcode">Zipcode</label>
                <input type="text" id="venueZipcode" {...register("venueZipcode")} onBlur={(e) => handleVenueSearch(e.target.value)} />
                {venues.length > 0 && (
                <div>
                    <h2>Venues</h2>
                    {venues.map((venue) => (
                    <button type="button" key={venue.id} onClick={() => handleVenueSelect(venue)}>
                        <div>{venue.name}</div>
                        <div>{venue.address}</div>
                        <div>{venue.price}</div>
                    </button>
                    ))}
                </div>
                )}
            </div>
            )}
        </div>
        <button type="submit" disabled={formState.isSubmitting}>Submit</button>
        </form>
    );
}
