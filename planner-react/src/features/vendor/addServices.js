import React from 'react';
import { useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { setVendorServices } from '../../slices/vendorSlice';

const AddServicesForm = () => {
    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, control, handleSubmit } = useForm({
        defaultValues: {
            services: [{ 
                serviceName: '', 
                serviceDescription: '', 
                price: 0 
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services'
    });

    const onSubmit = (services) => {
        // Submit services to server here
        console.log("Services to add: ", services);
        dispatch(setVendorServices(services))
        // navigate(`/home/${user._id}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            {fields.map((service, index) => (
                <div key={service.id}>
                <input
                    type="text"
                    placeholder="Service name"
                    {...register(`services.${index}.serviceName`)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    {...register(`services.${index}.serviceDescription`)}
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    {...register(`services.${index}.price`)}
                />
                {index > 0 && (
                    <button type="button" onClick={() => remove(index)}>
                    Delete
                    </button>
                )}
                </div>
            ))}
            <button type="button" onClick={() => append({ serviceName: '', serviceDescription: '', price: '' })}>
                Add service
            </button>

            </div>
            <button type="submit">Save</button>
        </form>
    );
};

export default AddServicesForm;
