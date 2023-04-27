import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './slices/sessionSlice'
import userReducer from './slices/userSlice'
import vendorReducer from './slices/vendorSlice'
import eventReducer from './slices/eventSlice'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: userReducer,
        vendor: vendorReducer,
        event: eventReducer
    }
})

export default store