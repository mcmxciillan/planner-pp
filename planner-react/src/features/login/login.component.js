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
import { setUser } from '../../slices/userSlice'
import { setVendor } from '../../slices/vendorSlice';

export default function LogInForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        axios.post('http://localhost:5000/login', data)
            .then(async (response) => {
            if (response.status === 200) {
                const userData = response.data.userData
                const userId = userData._id.$oid
                console.log("Logging in user: ", userData)
                dispatch(logUserIn(userData))
                dispatch(setUser(userData))
                dispatch(setJWT(response.data.access_token))
                if (userData.roles.indexOf('Vendor') > 0) {
                    console.log("User is a vendor. Fetching vendor data...")
                    const vendorResponse = await fetch(`http://localhost:5000/vendor/${userId}`)
                    const vendor = await vendorResponse.json()
                    console.log("Vendor: ", vendor)
                    dispatch(setVendor(vendor))
                }
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
        <form onSubmit={handleSubmit(onSubmit)} className='my-2'>
            
            <div className="flex justify-center my-4">
                <input type="email" className='p-2 w-4/5 w-100 border rounded-lg' placeholder='email@planner.com' {...register('email', { required: true })} />
            </div>
            <div className="flex justify-center my-4">
                <input type="password" className='p-2 w-4/5 w-100 border rounded-lg' placeholder='password' {...register('password', { required: true })} />
            </div>
            <div className="flex justify-center">
                <button className="border py-1 px-2 rounded-full mx-auto  w-1/4" type="submit">Log In</button>
            </div>
        </form>
    );
}