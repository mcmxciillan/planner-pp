import { createSlice } from '@reduxjs/toolkit'

export const eventsSlice = createSlice({
    name: 'events',
    initialState: {
        events: [],
    },
    reducers: {
        fetchEventsSuccess: (state, action) => {
            console.log("Fetched events: ", action.payload)
            state.events = action.payload
        },
        addEvent: (state, action) => {
            console.log("Adding event :", action.payload)
            state.events = [...state.events, action.payload]
        },
        removeEvent: (state, action) => {
            console.log("Removing event :", action.payload)
            state.events = [...state.events.filter(ev => ev.id !== action.payload.eventId)]
        }
    }
})

export const fetchUserEvents = (userId) => async (dispatch) => {
    try {
        console.log("fetching user Events")
        const response = await fetch(`http://localhost:5000/events/user/${userId}`);
        const data = await response.json();
        dispatch(fetchEventsSuccess(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const fetchVendorEvents = (vendorId) => async (dispatch) => {
    try {
        const response = await fetch(`http://localhost:5000/events/vendor/${vendorId}`);
        const data = await response.json();
        dispatch(fetchEventsSuccess(data));
    } catch (error) {
        console.error(error.message);
    }
}

export const { fetchEventsSuccess, addEvent, removeEvent } = eventsSlice.actions
export const selectEvents = (state) => state.events.events

export default eventsSlice.reducer