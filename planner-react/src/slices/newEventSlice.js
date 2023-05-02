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
            address: null,
            duration: null
        },
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
            state.newEvent.address = {street: where.address, zipcode: where.zipcode}
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
            state.newEvent.analytics = why
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
export default newEventSlice.reducer