import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectJWT, selectUser } from '../../session/sessionSlice';
import { useSelector } from 'react-redux';

export default function VendorSignupForm() {
    const [showVendorForm, setShowVendorForm] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const user = useSelector(selectUser)
    const jwtToken = useSelector(selectJWT)

    const onYesClick = () => {
        setShowVendorForm(true);
    }

    const onNoClick = () => {
        navigate(`/home/${user._id}`)
    }

    const handleVendorFormSubmit = (data) => {
        console.log(data)
        // Handle submitting vendor form data here
        const newVendorData = {
            name: data.name,
            email: data.email,
            address: data.address,
            zipcode: data.zipcode,
            vendorType: data.vendorType,
            operators: [user]
        }
        axios.post('http://localhost:5000/vendors/create', newVendorData, {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            if (response.status === 201) {
                navigate(`/home/${user._id}`);
            }
        })
        .catch((error) => {
            console.error(error);
        })
    };

    return (
        <>
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
                </form>
            )}
        </>
    );
}
