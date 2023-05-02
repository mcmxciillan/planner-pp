import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm, useFieldArray } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../slices/userSlice';
import { useDispatch } from 'react-redux';
import { addVendorServices, selectVendor, setVendorServices } from '../../slices/vendorSlice';

const AddServicesForm = () => {
    const vendor = useSelector(selectVendor);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [svcs, setSvcs] = useState([])
    const { register, control, reset, handleSubmit } = useForm({
        defaultValues: {
            services: [{ 
                serviceName: '', 
                serviceDescription: '', 
                price: '' 
            }]
        }
    });
    const { fields, append, remove } = useFieldArray({
        control,
        name: 'services'
    });

    const onSubmit = (services) => {
        console.log("Services to add: ", services);
        const allServices = [...svcs, ...services.services]
        console.log(allServices)
        // setSvcs(allServices)
        dispatch(addVendorServices(vendor.id, services))
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
            {fields.map((service, index) => (
                <div key={service.id}>
                
                <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 border rounded-lg" type="text"
                        placeholder="Service name"
                        {...register(`services.${index}.serviceName`)}
                    />
                </div>
                <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 border rounded-lg" type="text"
                    placeholder="Description"
                    {...register(`services.${index}.serviceDescription`)}
                />
                </div>
                <div className="flex justify-center my-4">
                    <input className="p-2 w-4/5 border rounded-lg" type="number"
                    step="0.01"
                    placeholder="Price"
                    {...register(`services.${index}.price`)}
                />
                </div>
                {index > 0 && (
                    <button className='border py-1 px-2 rounded-full mx-4 my-2  w-1/3' type="button" onClick={() => remove(index)}>
                    Delete
                    </button>
                )}
                </div>
            ))}
            <button className='border py-1 px-2 rounded-full mx-4  w-1/3' type="button" onClick={() => append({ serviceName: '', serviceDescription: '', price: '' })}>
                Add service
            </button>

            </div>
            <div className="flex justify-center my-4">
                <button className="border py-1 px-2 rounded-full mx-auto  w-1/4"type="submit">Save</button>
            </div>
        </form>
    );
};

export default AddServicesForm;
