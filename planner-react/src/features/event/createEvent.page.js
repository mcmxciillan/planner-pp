import GoBackButton from "../../components/goBackButton";
import { HowButton } from "../search/how/button";
import { WhatButton } from "../search/what/button";
import { WhenButton } from "../search/when/button";
import { WhereButton } from "../search/where/button";
import { WhoButton } from "../search/who/button";
import { WhyButton } from "../search/why/button";
import { useSelector } from "react-redux";
import { selectEventReady } from "../../slices/newEventSlice";

export default function CreateEventPage() {

    const isEventReady = useSelector(selectEventReady)
    
    return(
        <div>
            <GoBackButton />
            <p className="text-center font-bold">Answer...</p>
            <WhatButton />
            <WhereButton />
            <WhoButton />
            <WhenButton />
            <WhyButton />
            {isEventReady && <div>
                <p className="text-center">and we'll tell you...</p>
                <HowButton />
            </div>}
        </div>
    )
}