import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShippingState {
    shippingType: string;
}

const initialState: ShippingState = {
    shippingType: ''
};

const shippingSlice = createSlice({
    name: 'shipping',
    initialState,
    reducers: {
        setShippingType: (state, action: PayloadAction<string>) => {
            state.shippingType = action.payload;
        }
    }
})

export const { setShippingType } = shippingSlice.actions;
export default shippingSlice.reducer;