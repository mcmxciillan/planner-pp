import { Link } from "react-router-dom"

export const WhatButton = () => {
    return (
        <div className="bg-pp-red text-black font-bold py-2 px-4 rounded">
            <Link to={'/what'}>What?</Link>
        </div>
    )
}