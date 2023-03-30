import { configureStore } from '@reduxjs/toolkit'
import sessionReducer from './slices/sessionSlice'
import userReducer from './slices/userSlice'

const store = configureStore({
    reducer: {
        session: sessionReducer,
        user: userReducer
    }
})

export default store