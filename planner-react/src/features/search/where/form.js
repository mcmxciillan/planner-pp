import { useState } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setWhere } from '../../../slices/newEventSlice';
import GoBackButton from '../../../components/goBackButton';
import { useSelector } from 'react-redux';
import { selectWhere } from '../../../slices/newEventSlice';

export default function WhereForm() {
    const defaultValues = useSelector(selectWhere);
    const { register, handleSubmit, watch } = useForm({
        defaultValues
    });
    const [maxDistance, setMaxDistance] = useState(0);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSubmit = (data) => {
        if (data.hostingOption === "myself") {
            dispatch(setWhere({street: data.street, zipcode: data.zipcode, venue: null}))
            navigate(-1)
        } else {
            dispatch(setWhere({street: null, zipcode: data.zipcode, venue: null}))
            handleVenueSearch(data.zipcode)
        }
    }
    const hostingOption = watch("hostingOption");

    const handleSliderChange = (event) => {
        setMaxDistance(event.target.value);
    };
    const handleVenueSearch = async (zipcode) => {
        const url = `http://localhost:5000/venue/${zipcode}`;
        try {
            // fetch a post request to the backend with zipcode and range as the body
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ distance: maxDistance }),
            });
            const venues = await response.json();
            console.log("Venue results: ", venues)
            navigate('/events/where/results', { state: venues })
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
                                <input type="text" className='p-2 w-4/5 w-100 border rounded-lg' defaultValue={defaultValues.street} placeholder='Street Address' {...register("street")} />
                            </div>
                            <div className="flex justify-center my-4">
                                <input type="text" className='p-2 w-4/5 w-100 border rounded-lg' defaultValue={defaultValues.zipcode} placeholder='Zip Code' {...register("zipcode")} />
                            </div>
                        </>
                    )}
                </div>
                <div className="flex justify-center my-4">
                    <input type="radio" id="host-venue" value="venue" {...register("hostingOption")} />
                    <label className='mx-2' htmlFor="host-venue">Host at a venue</label>
                </div>
                    {hostingOption === "venue" && (
                        <>
                            <div className="flex justify-center my-4"><p></p></div>
                                <div className="flex justify-center my-4">
                                    <input type="text" className='p-2 w-4/5 w-100 border rounded-lg' defaultValue={defaultValues.zipcode} placeholder='Zip Code' {...register("zipcode", { required: true })} />
                                </div>
                                <div className="grid justify-center my-4">
                                <label className='' htmlFor="maxDistance">Maximum Distance (in miles)</label>
                                <input
                                    className='block'
                                    type="range"
                                    id="maxDistance"
                                    {...register('maxDistance')}
                                    min={0}
                                    max={100}
                                    value={maxDistance}
                                    onChange={handleSliderChange} />
                                <span>{maxDistance} miles</span>    
                                <div className="flex justify-center">
                                    <button className="border border-black py-1 rounded-full mx-auto my-4 px-4" type="submit">Find Venues</button>
                                </div>                       
                            </div>
                        </>
                    )}
                <div className="flex justify-center">
                    <button className="border py-1 px-2 rounded-full mx-auto w-1/4" type="submit">All done</button>
                </div>
            </form>
        </div>
    );
}
