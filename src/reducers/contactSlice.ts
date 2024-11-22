import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ContactState {
    email: string;
    name: string;
    address: string;
    addressTwo: string;
    zipcode: string;
    city: string;
    telephone: string;
}

const initialState: ContactState = {
    email: '',
    name: '',
    address: '',
    addressTwo: '',
    zipcode: '',
    city: '',
    telephone: ''
};

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setAddressTwo: (state, action: PayloadAction<string>) => {
            state.addressTwo = action.payload;
        },
        setZipcode: (state, action: PayloadAction<string>) => {
            state.zipcode = action.payload;
        },
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        },
        setTelephone: (state, action: PayloadAction<string>) => {
            state.telephone = action.payload;
        },
        setContactDetails: (state, action: PayloadAction<ContactState>) => {
            return { ...state, ...action.payload };
        },
    },
});

export const {
    setEmail,
    setName,
    setAddress,
    setAddressTwo,
    setZipcode,
    setCity,
    setTelephone,
    setContactDetails,
} = contactSlice.actions;

export default contactSlice.reducer;