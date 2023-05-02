import GoBackButton from "../../components/goBackButton";
import { HowButton } from "../search/how/button";
import { WhatButton } from "../search/what/button";
import { WhenButton } from "../search/when/button";
import { WhereButton } from "../search/where/button";
import { WhoButton } from "../search/who/button";
import { WhyButton } from "../search/why/button";

export default function CreateEventPage() {
    return(
        <div>
            <GoBackButton />
            <p className="text-center font-bold">Answer the...</p>
            <WhatButton />
            <WhereButton />
            <WhoButton />
            <WhenButton />
            <WhyButton />
            <p className="text-center">and we'll tell you...</p>
            <HowButton />
        </div>
    )
}