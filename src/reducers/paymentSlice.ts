import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
    paymentType: string;
}

const initialState: PaymentState = {
    paymentType: ''
};

const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        setPaymentType: (state, action: PayloadAction<string>) => {
            state.paymentType = action.payload;
        }
    }
})

export const { setPaymentType } = paymentSlice.actions;
export default paymentSlice.reducer;