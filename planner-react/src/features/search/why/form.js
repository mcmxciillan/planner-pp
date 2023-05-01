import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setWhy } from "../../../slices/newEventSlice";
import GoBackButton from "../../../components/goBackButton";

export default function WhyForm() {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        console.log(data)
        navigate(-1)
        // dispatch(setWhy(data.description))
    };

    return (
        <div>
            <GoBackButton/>
            <p>Analytics page</p>
            <p>...under construction</p>
        </div>
    );
}
