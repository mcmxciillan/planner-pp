import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './slices/sessionSlice'
import userReducer from './slices/userSlice'
import vendorReducer from './slices/vendorSlice'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: userReducer,
        vendor: vendorReducer
    }
})

export default store