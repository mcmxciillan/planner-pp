
import { createSlice } from '@reduxjs/toolkit'

export const vendorSlice = createSlice({
    name: 'vendor',
    initialState: {
        vendor: {
            id: null,
            name: null,
            email: null,
            address: null,
            zipcode: null,
            vendorType: null,
            operatorIds: null,
            rating: null,
            ratingCount: null,
            services: null
        },
    },
    reducers: {
        setVendor: (state, action) => {
            const payload = action.payload
            const vendorData = {
                id: payload._id.$oid,
                name: payload.name,
                email: payload.email,
                address: payload.address,
                vendorType: payload.vendorType,
                operatorIds: payload.operator_ids,
                rating: payload.rating,
                ratingCount: payload.rating_count,
                services: payload.services
            }
            state.vendor = vendorData
        },
        setVendorServices: (state, action) => {
            console.log("Vendor state services: ", action.payload)
            // const newServices = action.payload;
            // state.vendor.services = newServices
        },
        removeVendorServices: (state, action) => {
            console.log("Services to remove: ", action.payload)
        },
        clearVendor: (state) => {
            state.vendor = null
        }
    }
})

export const addVendorServices = (id, services) => async (dispatch) => {
    console.log("Adding vendor services in slice")
    fetch(`http://localhost:5000/vendor/services/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({services: services}),
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
        })
        .catch((error) => console.error(error));
}

export const { setVendor, setVendorServices, clearVendor } = vendorSlice.actions
export const selectVendor = (state) => state.vendor.vendor

export default vendorSlice.reducer