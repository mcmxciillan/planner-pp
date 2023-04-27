import { createSlice } from '@reduxjs/toolkit'

export const eventSlice = createSlice({
    name: 'event',
    initialState: {
        event: null,
    },
    reducers: {
        setWhat: (state, action) => {
            const what = action.payload;
            console.log("Setting What: ", what)
            state.event.name = what
        },
        setWhere: (state, action) => {
            const where = action.payload;
            console.log("Setting Where: ", where)
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

export const { setWhat, setWhere, setWho, setWhen, setWhy, setEvent, clearEvent } = eventSlice.actions
export const selectEvent = (state) => state.event.event
export default eventSlice.reducer