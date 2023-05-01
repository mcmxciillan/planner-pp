import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useForm } from 'react-hook-form';
import GoBackButton from '../../../components/goBackButton';
import { setWhen } from '../../../slices/newEventSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function WhenForm() {
    const { register, handleSubmit } = useForm();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        const { startTime, durationHours, durationMinutes } = data;
        const whenData = {
            date: selectedDate.toDateString(),
            startTime: startTime,
            duration: Number(durationHours * 60) + Number(durationMinutes) || null
        }
        dispatch(setWhen(whenData));
        navigate(-1);
    };

    return (
        <div className='w-100'>
            <GoBackButton />
            <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
                <p className="text-center">When will this event be held?</p>
                <div className='my-4'>
                    <Calendar onChange={setSelectedDate} value={selectedDate} className={'mx-auto rounded-xl'}/>
                </div>
                <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"type="time" id="startTime" name="startTime" {...register("startTime")} />
                </div>
                <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"type="number" id="durationHours" placeholder='Hours' name="durationHours" {...register("durationHours")} />
                </div>
                <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"type="number" id="durationMinutes" placeholder='Minutes' name="durationMinutes" {...register("durationMinutes")} />
                </div>
                <div className="flex justify-center my-4">
                    <button className="border py-1 px-2 rounded-full mx-auto  w-1/4"type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
