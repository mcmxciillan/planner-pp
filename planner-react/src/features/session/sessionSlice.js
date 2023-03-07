import { createSlice } from '@reduxjs/toolkit'

export const sessionSlice = createSlice({
    name: 'session',
    initialState: {
        userLoggedIn: false,
        jwt: null
    },
    reducers: {
        logUserIn: (state) => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
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

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserLoggedIn = (state) => state.session.userLoggedIn
export const selectJWT = (state) => state.session.jwt

export default sessionSlice.reducer
