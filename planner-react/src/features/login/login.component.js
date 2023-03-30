/**
* The LogInForm component is responsible for rendering a form that allows the user to log in to the application
* by making a POST request to the server with the provided email and password. It uses the useForm hook from
* react-hook-form to manage form state and validation. If the login is successful, it dispatches the logUserIn
* and setJWT actions from the sessionSlice of the Redux store and navigates the user to the home page with
* their user ID in the URL. If the login is unsuccessful, it displays an error message to the user.
* @returns {JSX.Element} - A form element that allows the user to log in to the application.
*/
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logUserIn, setJWT } from '../../slices/sessionSlice'

export default function LogInForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
        axios.post('http://localhost:5000/login', data)
            .then((response) => {
            if (response.status === 200) {
                console.log(response)
                const userId = response.data.userData._id.$oid
                dispatch(logUserIn(response.data.userData))
                dispatch(setJWT(response.data.access_token))
                navigate(`/home/${userId}`);
            } else {
                errors.loginError = 'Incorrect email or password'
                throw new Error('Incorrect email or password')
            }}
        )
        .catch((error) => {
            console.error(error)
        });
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
        {errors && <p>{errors.loginError}</p>}
        <label>
            Email:
            <input type="email" {...register('email', { required: true })} />
        </label>
        <label>
            Password:
            <input type="password" {...register('password', { required: true })} />
        </label>
        <button type="submit">Log in</button>
    </form>
    );
}