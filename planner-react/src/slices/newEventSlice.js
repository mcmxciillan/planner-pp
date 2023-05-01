import { createSlice } from '@reduxjs/toolkit'

export const newEventSlice = createSlice({
    name: 'newEvent',
    initialState: {
        event: {
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
            state.event.name = what.name
            state.event.description = what.description
        },
        setWhere: (state, action) => {
            const where = action.payload;
            console.log("Setting Where: ", where)
            state.event.address = {street: where.address, zipcode: where.zipcode}
        },
        setWho: (state, action) => {
            const who = action.payload;
            console.log("Setting Who: ", who)
        },
        setWhen: (state, action) => {
            const when = action.payload;
            console.log(when)
        },
        setWhy: (state, action) => {
            // Analytics info
            const why = action.payload;
            console.log("Setting Why: ", why)
            state.event.description = why
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
            state.event = eventData
        },
        clearEvent: (state) => {
            state.event = null
        }
    }
})

export const { setWhat, setWhere, setWho, setWhen, setWhy, setEvent, clearEvent } = newEventSlice.actions
export const selectEvent = (state) => state.newEvent.newEvent
export default newEventSlice.reducer