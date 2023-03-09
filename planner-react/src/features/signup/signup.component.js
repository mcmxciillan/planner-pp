import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logUserIn, setJWT } from '../session/sessionSlice'

export default function SignUpForm() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        axios.post("http://localhost:5000/signup", {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
        })
        .then((response) => {
            if (response.status === 201) {
                const userId = response.data.userData._id;
                dispatch(logUserIn(response.data.userData))
                dispatch(setJWT(response.data.access_token))
                navigate(`/home/${userId}`);
            }
        })
        .catch((error) => {
            console.error(error);
            errors.loginError = true;
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                First Name
                <input {...register("firstName", { required: true })} />
            </label>
            {errors.firstName && <span>This field is required</span>}

            <label>
                Last Name
                <input {...register("lastName", { required: true })} />
            </label>
            {errors.lastName && <span>This field is required</span>}

            <label>
                Email
                <input {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
            </label>
            {errors.email && <span>This field is required</span>}

            <label>
                Password
                <input {...register("password", { required: true, minLength: 8 })} />
            </label>
            {errors.password && <span>This field is required and must be at least 8 characters</span>}

            <label>
                Password Confirmation
                <input {...register("passwordConfirmation", {
                    required: true, 
                    validate: value => value === watch("password")
                })}
                />
            </label>
            {errors.passwordConfirmation && <span>Passwords do not match</span>}
            {errors.loginError && <span>Login Error. Try again</span>}

            <button type="submit">Sign Up</button>
        </form>
    );
}