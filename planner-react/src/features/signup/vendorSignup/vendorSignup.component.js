import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectJWT } from '../../../slices/sessionSlice';
import { addVendorRoleToUser, selectUser } from '../../../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setVendor } from '../../../slices/vendorSlice';
import GoBackButton from '../../../components/goBackButton';

export default function VendorSignupForm() {
    const [showVendorForm, setShowVendorForm] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
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
            vendorType: data.vendorType,
            operator_id: user.id
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

    return (
        <>
        <GoBackButton />
            {!showVendorForm && (
                <div>
                    <p>Do you want to sign up as a vendor?</p>
                    <button onClick={onYesClick}>Yes</button>
                    <button onClick={onNoClick}>No</button>
                </div>
            )}

            {showVendorForm && (
                <form onSubmit={handleSubmit(handleVendorFormSubmit)}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                            className="input"
                            type="text"
                            {...register('name', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                            className="input"
                            type="email"
                            {...register('email', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Address</label>
                        <div className="control">
                            <input
                            className="input"
                            type="text"
                            {...register('address', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Zipcode</label>
                        <div className="control">
                            <input
                            className="input"
                            type="text"
                            {...register('zipcode', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Vendor Type</label>
                        <div className="control">
                            <input
                            className="input"
                            type="text"
                            {...register('vendorType', { required: true })}
                            />
                        </div>
                    </div>
                    <div className="buttons">
                        <button className="button is-success" type="submit">
                            Save
                        </button>
                    </div>
                    {errors.postError && <div className='text-red-600'>{errors.postError}</div>}
                </form>
            )}
        </>
    );
}
