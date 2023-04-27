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
            <p>Answer the...</p>
            <WhatButton />
            <WhereButton />
            <WhoButton />
            <WhenButton />
            <WhyButton />
            <HowButton />
        </div>
    )
}