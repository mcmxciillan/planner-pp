import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import GoBackButton from '../../../components/goBackButton';


export default function WhoResults() {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    console.log("Who search results: ", location.state)

    return (
        <div className='mx-2'>
            <GoBackButton />
            <h1 className='text-center font-bold'>Results</h1>
            <ul>
                {Object.keys(location.state).map((type, i) =>
                    <li key={i}>
                        <div className='mx-2'>
                            <p className='font-bold'>{type}</p>
                            {location.state[type].length > 0 ? 
                            <ul>
                                {location.state[type].map((vendor, i) => (
                                    <li key={i} className='border rounded-lg p-2 my-2'>
                                        <p>{vendor.name}</p>
                                        <p>{vendor.rating}</p>
                                        <p>{vendor.address.street}, {vendor.address.zipcode}</p>
                                        <button type='button' onClick={() => navigate()}>Services</button>
                                    </li>
                                ))}
                            </ul> : <p>None found</p>}
                                <hr/>
                        </div>                    
                    </li>
                )}
            </ul>
        </div>
    );
}