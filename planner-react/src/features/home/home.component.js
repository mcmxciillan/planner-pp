import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import LogOutButton from '../../components/logOutButton';
import { selectUser } from '../session/sessionSlice';
export default function Home() {

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const { userId } = useParams()
    console.log(user)

    return (
        <div>
            <LogOutButton/>
            <p>{userId}</p>
        </div>
    );
}