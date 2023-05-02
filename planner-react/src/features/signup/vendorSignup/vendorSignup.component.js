import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectJWT } from '../../../slices/sessionSlice';
import { addVendorRoleToUser, selectUser } from '../../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setVendor } from '../../../slices/vendorSlice';
import GoBackButton from '../../../components/goBackButton';
import { servicesList } from '../../../data/services';

export default function VendorSignupForm() {
    const [showVendorForm, setShowVendorForm] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset  } = useForm();
    const [vendorType, setVendorType] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const user = useSelector(selectUser)
    const jwtToken = useSelector(selectJWT)
    const dispatch = useDispatch();


    const onYesClick = () => {
        setShowVendorForm(true);
    }

    const onNoClick = () => {
        navigate(-1)
    }

    const handleVendorFormSubmit = (data) => {
        // Handle submitting vendor form data here
        const newVendorData = {
            name: data.name,
            email: data.email,
            address: data.address,
            zipcode: data.zipcode,
            vendorType: vendorType,
            operator_id: user._id
        }
        console.log(newVendorData)
        axios.post('http://localhost:5000/vendors/create', newVendorData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status === 201) {
                dispatch(setVendor(response.data))
                dispatch(addVendorRoleToUser())
                navigate(`/vendor/services`);
            }
        })
        .catch((error) => {
            console.error(error);
            errors.postError = error;
        })
    }; 

    const handleAutocomplete = (event) => {
        const inputVal = event.target.value;
        setVendorType(inputVal)
        const suggestions = servicesList.filter(
        (service) =>
            service.toLowerCase().indexOf(inputVal.toLowerCase()) > -1
        );
        setSuggestions(suggestions);
    };

    const handleSelection = (type) => {
        console.log(type)
        setVendorType(type);
        setSuggestions([]);
    };

    return (
        <>
        <GoBackButton />
            {!showVendorForm && (
                <div>
                    <p className='text-center font-bold'>Do you want to sign up as a vendor?</p>
                    <div className="flex justify-center my-4">
                        <button className="border py-1 px-2 rounded-full mx-auto w-1/4" onClick={onYesClick}>Yes</button>
                    </div>
                    <div className="flex justify-center my-4">
                        <button className="border py-1 px-2 rounded-full mx-auto w-1/4" onClick={onNoClick}>No</button>
                    </div>
                </div>
            )}

            {showVendorForm && (
                <form onSubmit={handleSubmit(handleVendorFormSubmit)}>
                    <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"
                            placeholder='Business Name'
                            type="text"
                            {...register('name', { required: true })}
                        />
                    </div>
                    <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"
                            placeholder='Business Email'
                            type="email"
                            {...register('email', { required: true })}
                        />
                    </div>
                    <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"
                            placeholder='Business Address'
                            type="text"
                            {...register('address', { required: true })}
                        />
                    </div>
                    <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"
                            placeholder='Zipcode'
                            type="text"
                            {...register('zipcode', { required: true })}
                        />
                    </div>
                    <div className="flex justify-center my-4">
                        <input className="p-2 w-4/5 border rounded-lg"
                            type="text"
                            id="service"
                            placeholder='Vendor Type'
                            name="vendorType"
                            autoComplete="off"
                            value={vendorType}
                            {...register('vendorType')}
                            onChange={handleAutocomplete} 
                        />
                    </div>
                        {suggestions.length > 0 && (
                            <ul className='w-4/5 mx-auto'>
                                {suggestions.map((vendorType) => (
                                    <li className='text-center h-16 text-middle align-middle text-xl border' key={vendorType} onClick={() => handleSelection(vendorType)}>
                                        {vendorType}
                                    </li>
                                ))}
                            </ul>
                        )}
                    <div className="flex justify-center my-4">
                        <button className="border py-1 px-2 rounded-full mx-auto w-1/4" type="submit">
                            Save
                        </button>
                    </div>
                    {errors.postError && <div className='text-red-600'>{errors.postError}</div>}
                </form>
            )}
        </>
    );
}
