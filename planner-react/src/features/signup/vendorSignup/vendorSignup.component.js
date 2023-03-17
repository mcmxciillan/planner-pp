import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import axios from 'axios';
import { selectJWT, selectUser } from '../../session/sessionSlice';
import { useSelector } from 'react-redux';

export default function VendorSignupForm() {
    const [showVendorForm, setShowVendorForm] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const stateOptions = [
        { value: 'AL', label: 'Alabama' },
        { value: 'AK', label: 'Alaska' },
        { value: 'AZ', label: 'Arizona' },
        { value: 'AR', label: 'Arkansas' },
        { value: 'CA', label: 'California' },
        { value: 'CO', label: 'Colorado' },
        { value: 'CT', label: 'Connecticut' },
        { value: 'DE', label: 'Delaware' },
        { value: 'FL', label: 'Florida' },
        { value: 'GA', label: 'Georgia' },
        { value: 'HI', label: 'Hawaii' },
        { value: 'ID', label: 'Idaho' },
        { value: 'IL', label: 'Illinois' },
        { value: 'IN', label: 'Indiana' },
        { value: 'IA', label: 'Iowa' },
        { value: 'KS', label: 'Kansas' },
        { value: 'KY', label: 'Kentucky' },
        { value: 'LA', label: 'Louisiana' },
        { value: 'ME', label: 'Maine' },
        { value: 'MD', label: 'Maryland' },
        { value: 'MA', label: 'Massachusetts' },
        { value: 'MI', label: 'Michigan' },
        { value: 'MN', label: 'Minnesota' },
        { value: 'MS', label: 'Mississippi' },
        { value: 'MO', label: 'Missouri' },
        { value: 'MT', label: 'Montana' },
        { value: 'NE', label: 'Nebraska' },
        { value: 'NV', label: 'Nevada' },
        { value: 'NH', label: 'New Hampshire' },
        { value: 'NJ', label: 'New Jersey' },
        { value: 'NM', label: 'New Mexico' },
        { value: 'NY', label: 'New York' },
        { value: 'NC', label: 'North Carolina' },
        { value: 'ND', label: 'North Dakota' },
        { value: 'OH', label: 'Ohio' },
        { value: 'OK', label: 'Oklahoma' },
        { value: 'OR', label: 'Oregon' },
        { value: 'PA', label: 'Pennsylvania' },
        { value: 'RI', label: 'Rhode Island' },
        { value: 'SC', label: 'South Carolina' },
        { value: 'SD', label: 'South Dakota' },
        { value: 'TN', label: 'Tennessee' },
        { value: 'TX', label: 'Texas' },
        { value: 'UT', label: 'Utah' },
        { value: 'VT', label: 'Vermont' },
        { value: 'VA', label: 'Virginia' },
        { value: 'WA', label: 'Washington' },
        { value: 'WV', label: 'West Virginia' },
        { value: 'WI', label: 'Wisconsin' },
        { value: 'WY', label: 'Wyoming' }
    ];
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
            state: data.state,
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
                        <label htmlFor="state">State:</label>
                        <Select
                            id="state"
                            {...register('state')}
                            options={stateOptions}
                            placeholder="Select a state"
                        />
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
