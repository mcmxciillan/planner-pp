
import { createSlice } from '@reduxjs/toolkit'

export const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        vendor: null,
    },
    reducers: {
        setVendor: (state, action) => {
            const payload = action.payload
            const vendorData = {
                id: payload._id.$oid,
                name: payload.name,
                email: payload.email,
                address: payload.address,
                zipcode: payload.zipcode,
                vendorType: payload.vendorType,
                operatorIds: payload.operator_ids,
                rating: payload.rating,
                ratingCount: payload.rating_count,
                services: payload.services
            }
            state.vendor = vendorData
        },
        setVendorServices: (state, action) => {
            console.log("Vendor state: ", state.vendor)
            const newServices = action.payload.services;
            // const existingServices = state.vendor
            // console.log([...newServices, ...existingServices])
            // state.vendor.services.append(...services)
        },
        removeVendorServices: (state, action) => {
            console.log("Services to remove: ", action.payload)
        },
        clearVendor: (state) => {
            state.vendor = null
        }
    }
})

export const { setVendor, setVendorServices, clearVendor } = vendorSlice.actions
export const selectVendor = (state) => state.vendor.vendor

export default vendorSlice.reducer