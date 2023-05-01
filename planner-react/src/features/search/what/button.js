import { Link } from "react-router-dom"

export const WhatButton = () => {
    return (
        <div className="bg-pp-red bg-opacity-50 border border-black w-2/3 mx-auto my-4 text-black font-bold py-2 px-4 rounded-lg text-center">
            <Link to={'/events/what'}>What?</Link>
        </div>
    )
}