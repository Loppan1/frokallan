import { combineReducers } from 'redux';
import contactReducer from './contactSlice';
import paymentReducer from './paymentSlice'
import shippingReducer from './shippingSlice'
import cartReducer from './cartSlice'

const rootReducer = combineReducers({
  contact: contactReducer,
  payment: paymentReducer,
  shipping: shippingReducer,
  cart: cartReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;