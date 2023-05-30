import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectWhat } from "../../../slices/newEventSlice";

export const WhatButton = () => {
    const { name, description } = useSelector(selectWhat);

    function whatButtonLabel() {
        if (name !== null && description !== null) {
            return <span>&#x2713;</span>
        } else {
            return "What?"
        }
    }

    return (
        <div className="bg-pp-red bg-opacity-50 border border-black w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/what'}>{whatButtonLabel()}</Link>
        </div>
    )
}