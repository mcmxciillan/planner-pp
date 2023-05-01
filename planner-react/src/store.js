import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './slices/sessionSlice'
import userReducer from './slices/userSlice'
import vendorReducer from './slices/vendorSlice'
import newEventReducer from './slices/newEventSlice'
import eventsReducer from './slices/eventsSlice'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: userReducer,
        vendor: vendorReducer,
        newEvent: newEventReducer,
        events: eventsReducer
    }
})

export default store