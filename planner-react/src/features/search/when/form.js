import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setWhen } from '../../slices/eventSlice'

export default function WhenForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        // Set when
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Vendors
                <input {...register("vendors", { required: true })} />
            </label>
            {errors.vendors && <span>This field is required</span>}

            <label>
                Organizers
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            </label>
            {errors.organizers && <span>This field is required</span>}

            <button type="submit">All done</button>
        </form>
    );
}
