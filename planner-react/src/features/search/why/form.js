import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setWhy } from '../../slices/eventSlice'

export default function WhyForm() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
        dispatch(setWhy(data.description))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Description
                <input {...register("description", { required: true })} />
            </label>

            <button type="submit">All done</button>
        </form>
    );
}
