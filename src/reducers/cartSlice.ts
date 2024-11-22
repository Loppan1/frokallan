import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
  title: string;
  name: string;
  price: number;
  image: string;
  amount: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

const loadCartFromLocalStorage = (): CartItem[] => {
  try {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (e) {
    return [];
  }
};

const loadTotalItemsFromLocalStorage = (): number => {
  try {
    const savedTotalItems = localStorage.getItem('totalItems');
    return savedTotalItems ? parseInt(savedTotalItems, 10) : 0;
  } catch (e) {
    return 0;
  }
};

const initialState: CartState = {
  items: loadCartFromLocalStorage(),
  totalItems: loadTotalItemsFromLocalStorage(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const product = action.payload;
      const existingProduct = state.items.find(item => item.name === product.name);
      
      if (existingProduct) {
        existingProduct.amount += product.amount;
        state.totalItems += product.amount;
      } else {
        state.items.push(product);
        state.totalItems += product.amount;
      }
      
      localStorage.setItem('cart', JSON.stringify(state.items));
      localStorage.setItem('totalItems', state.totalItems.toString());
    },

    updateCartItem: (state, action: PayloadAction<{ name: string, amount: number }>) => {
      const { name, amount } = action.payload;
      const product = state.items.find(item => item.name === name);
      
      if (product) {
        const diff = amount - product.amount; 
        product.amount = amount;
        state.totalItems += diff;  
        
        localStorage.setItem('cart', JSON.stringify(state.items));
        localStorage.setItem('totalItems', state.totalItems.toString());
      }
    },

    removeFromCart: (state, action: PayloadAction<string>) => {
      const itemToRemove = state.items.find(item => item.name === action.payload);
      if (itemToRemove) {
        state.totalItems -= itemToRemove.amount;  
        state.items = state.items.filter(item => item.name !== action.payload);  
        
        localStorage.setItem('cart', JSON.stringify(state.items));
        localStorage.setItem('totalItems', state.totalItems.toString());
      }
    },
    
    clearCart: (state) => {
        state.items = [];
        state.totalItems = 0;
        localStorage.removeItem('cart'); 
        localStorage.removeItem('totalItems');
      }
  }
});

export const { addToCart, updateCartItem, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;