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
        <div className="vw-100">
        <form onSubmit={handleSubmit(onSubmit)} className="my-2">
            <div className="flex justify-center my-4">
                <input className="p-2 w-4/5 border rounded-lg" placeholder="First Name" {...register("firstName", { required: true })} />
                {errors.firstName && <span>This field is required</span>}
            </div>
            <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 w-100 border rounded-lg" placeholder="Last Name" {...register("lastName", { required: true })} />
                {errors.lastName && <span>This field is required</span>}
            </div>
            <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 border rounded-lg" placeholder="Email" {...register("email", { required: true, pattern: /^\S+@\S+$/i })} />
                {errors.email && <span>This field is required</span>}
            </div>
            <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 border rounded-lg" placeholder="Password" {...register("password", {
                        required: true,
                        minLength: 8 })}
                        type="password" />
                {errors.password && <span>This field is required and must be at least 8 characters</span>}
            </div>
            <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 border rounded-lg" placeholder="Confirm Password" {...register("passwordConfirmation", {
                        required: true,
                        validate: value => value === watch("password")
                    })}
                    type="password"
                    />
                {errors.passwordConfirmation && <span>Passwords do not match</span>}
            </div>
            {errors.loginError && <span>Login Error. Try again</span>}
            <div className="flex justify-center my-4">
                <button className="border py-1 px-2 rounded-full mx-auto  w-1/4" type="submit">Sign Up</button>
            </div>
        </form>
        </div>
    );
}
