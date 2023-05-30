import { createSlice } from '@reduxjs/toolkit'

export const newEventSlice = createSlice({
    name: 'newEvent',
    initialState: {
        newEvent: {
            name: null,
            date: null,
            description: null,
            organizers: null,
            vendors: null,
            startTime: null,
            address: {street: null, zipcode: null},
            venue: null,
            duration: null
        },
        analytics: {
            selectedServices: [],
        }
    },
    reducers: {
        setWhat: (state, action) => {
            const what = action.payload;
            console.log("Setting What: ", what)
            state.newEvent.name = what.name
            state.newEvent.description = what.description
        },
        setWhere: (state, action) => {
            const where = action.payload;
            console.log("Setting Where: ", where)
            state.newEvent.address = {street: where.street, zipcode: where.zipcode}
            state.newEvent.venue = where.venue
        },
        setWho: (state, action) => {
            const who = action.payload;
            console.log("Setting Who: ", who)
            state.newEvent.vendors = who.vendors
            state.newEvent.organizers = [who.organizer]
        },
        setWhen: (state, action) => {
            const when = action.payload;
            console.log("Setting when: ", when)
            state.newEvent.date = when.date;
            state.newEvent.startTime = when.startTime;
            state.newEvent.duration = when.duration;
        },
        setWhy: (state, action) => {
            // Analytics info
            const why = action.payload;
            console.log("Setting Why: ", why)
            state.analytics = why
        },
        setEvent: (state, action) => {
            const e = action.payload;
            const eventData = {
                name: e.name,
                date: e.date,
                description: e.description,
                organizers: e.organizers,
                vendors: e.vendors,
                start_date: e.start_date,
                start_time: e.start_time,
                address: e.address,
                duration: e.duration
            }
            state.newEvent = eventData
        },
        clearEvent: (state) => {
            state.newEvent = null
        }
    }
})

export const { setWhat, setWhere, setWho, setWhen, setWhy, setEvent, clearEvent } = newEventSlice.actions
export const selectNewEvent = (state) => state.newEvent.newEvent
export const selectEventReady = (state) => {
    // checks if all values for the new event are not null
    const event = state.newEvent.newEvent
    return (
        event.name !== null && 
        event.date !== null && 
        event.description !== null && 
        event.organizers !== null && 
        event.startTime !== null && 
        event.address.street !== null && 
        event.address.zipcode !== null
    )
}
export const selectWhat = (state) => {
    return {
        name: state.newEvent.newEvent.name,
        description: state.newEvent.newEvent.description
    }
}
export const selectWhere = (state) => {
    return {
        street: state.newEvent.newEvent.address.street,
        zipcode: state.newEvent.newEvent.address.zipcode,
        venue: state.newEvent.newEvent.venue
    }
}
export const selectWho = (state) => {
    return {
        organizer: state.newEvent.newEvent.organizers,
        vendors: state.newEvent.newEvent.vendors
    }
}
export const selectWhen = (state) => {
    return {
        date: state.newEvent.newEvent.date,
        startTime: state.newEvent.newEvent.startTime,
        duration: state.newEvent.newEvent.duration
    }
}
export const selectWhy = (state) => {
    return {
        analytics: state.newEvent.analytics
    }
}
export default newEventSlice.reducer