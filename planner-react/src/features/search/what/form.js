import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
// import { setWhat } from '../../slices/newEventSlice'
import GoBackButton from "../../../components/goBackButton";
import { setWhat } from "../../../slices/newEventSlice";

export default function WhatForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(setWhat({name: data.eventName, description: data.eventDescription}))
        navigate(-1)
    };

    return (
        <div>
            <GoBackButton/>
            <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
                <p className="text-center">What is this event?</p>
                <div className="flex justify-center my-4">
                    <input type="text" className='p-2 w-4/5 w-100 border rounded-lg' placeholder='Event Name' {...register("eventName", { required: true })} />
                </div>
                <div className="flex justify-center my-4">
                    <input type="textarea" className='p-2 w-4/5 w-100 border rounded-lg' placeholder='Event Description' {...register("eventDescription", { required: false })} />
                </div>
                <div className="flex justify-center my-4">
                    <input
                        type="file"
                        id="image"
                        {...register('image', { required: false })} />                
                </div>
                <div className="flex justify-center">
                    <button className="border py-1 px-2 rounded-full mx-auto  w-1/4" type="submit">All done</button>
                </div>
            </form>
        </div>
    );
}
