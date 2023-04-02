/**
* The SignUpForm component is responsible for rendering a form that allows the user to sign up for the application
* by making a POST request to the server with the provided first name, last name, email, and password. It uses the
* useForm hook from react-hook-form to manage form state and validation. If the sign up is successful, it dispatches
* the logUserIn and setJWT actions from the sessionSlice of the Redux store and navigates the user to the vendor signup
* page. If the sign up is unsuccessful, it displays an error message to the user.
* @returns {JSX.Element} - A form element that allows the user to sign up for the application.
*/
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { logUserIn, setJWT } from '../../slices/sessionSlice'
import { setUser } from "../../slices/userSlice";

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
                console.log(response.data)
                dispatch(logUserIn(response.data.userData))
                dispatch(setJWT(response.data.access_token))
                dispatch(setUser(response.data.userData))
                navigate(`/home/${response.data.userData._id.$oid}`);
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
                <input {...register("password", { 
                    required: true, 
                    minLength: 8 })} 
                    type="password" />
            </label>
            {errors.password && <span>This field is required and must be at least 8 characters</span>}

            <label>
                Password Confirmation
                <input {...register("passwordConfirmation", {
                    required: true,
                    validate: value => value === watch("password")
                })}
                type="password" 
                />
            </label>
            {errors.passwordConfirmation && <span>Passwords do not match</span>}
            {errors.loginError && <span>Login Error. Try again</span>}

            <button type="submit">Sign Up</button>
        </form>
    );
}
