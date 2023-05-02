import { useState } from 'react';
import { useForm } from 'react-hook-form';
import GoBackButton from '../../../components/goBackButton';
import { useNavigate } from 'react-router-dom';
import { servicesList } from '../../../data/services';

export default function WhoForm() {
    const { register, handleSubmit, reset } = useForm();
    const [selectedServices, setSelectedServices] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleAutocomplete = (event) => {
        const inputVal = event.target.value;
        const suggestions = servicesList.filter(
        (service) =>
            service.toLowerCase().indexOf(inputVal.toLowerCase()) > -1 &&
            !selectedServices.includes(service)
        );
        setSuggestions(suggestions);
    };

    const onSubmit = () => {
        console.log(selectedServices)
        searchVendorsByTypes(selectedServices)
    }

    const handleSelection = (service) => {
        setSelectedServices([...selectedServices, service]);
        setSuggestions([]);
        reset();
    };

    const handleDelete = (service) => {
        setSelectedServices(selectedServices.filter((item) => item !== service));
    };
    function searchVendorsByTypes(types) {
        console.log("Types: ", types)
        fetch('http://localhost:5000/search/types', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
                body: JSON.stringify({types: types}),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                navigate('/who/results', { state: data });
            })
            .catch((error) => console.error(error));
    }
    
    return (
        <div>
            <GoBackButton />
            <form onSubmit={handleSubmit(onSubmit)} className='my-4'>
                <p className='font-lg text-center my-2'>Who's going to help out?</p>
                <input
                className='p-2 w-4/5 mx-auto border rounded-lg justify-self-center flex'
                    type="text"
                    id="service"
                    placeholder='Enter a Service'
                    name="service"
                    autoComplete="off"
                    {...register('service')}
                    onChange={handleAutocomplete} />
                {suggestions.length > 0 && (
                    <ul className='w-4/5 mx-auto'>
                        {suggestions.map((service) => (
                            <li className='text-center h-16 text-middle align-middle text-xl border' key={service} onClick={() => handleSelection(service)}>
                                {service}
                            </li>
                        ))}
                    </ul>
                )}
                <div className="flex justify-center">
                    {selectedServices.length > 0 && <button className="border border-black py-1 rounded-full mx-auto my-4 px-4" type="submit">Find Vendors</button>}
                </div>
            </form>
            <div className='w-100'>
                <ul>
                    {selectedServices.map((service, i) => (
                        <li className='w-2/3 mx-auto my-4 text-center rounded-xl border p-2' key={`${service}-${i}`}>
                            <button type="w-1/3 my-4 mx-auto button active:bg-pp-red" onClick={() => handleDelete(service)}>
                                {service}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
