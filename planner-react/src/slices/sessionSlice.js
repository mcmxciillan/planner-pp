import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        userLoggedIn: false,
        jwt: null
    },
    reducers: {
        logUserIn: (state, action) => {
            state.userLoggedIn = true
        },
        logUserOut: (state) => {
            state.userLoggedIn = false
        },
        setJWT: (state, action) => {
            state.jwt = action.payload
        },
        clearJWT: (state) => {
            state.jwt = null
        }
    },
})
export const { logUserIn, logUserOut, setJWT, clearJWT } = sessionSlice.actions

export const selectUserLoggedIn = (state) => state.session.userLoggedIn
export const selectJWT = (state) => state.session.jwt

export default sessionSlice.reducer