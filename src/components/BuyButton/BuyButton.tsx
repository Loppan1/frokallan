import { useEffect, useState } from 'react';
import './BuyButton.css'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateCartItem } from '../../reducers/cartSlice';

interface BuyButtonProps {
    buttonText: string;
    title: string; 
    name: string;
    price: number;
    image: string;
    amountText: string;
}

const BuyButton: React.FC<BuyButtonProps> = ({buttonText, title, name, price, image, amountText}) => {
    const dispatch = useDispatch();
    const cart = useSelector((state: any) => state.cart.items)
    const [amount, setAmount] = useState(1);

    useEffect(() => {
        const existingProduct = cart.find((item: any) => item.name === name);
        if (existingProduct) {
          setAmount(existingProduct.amount);
        }
      }, [cart, name]);

    const handleAddToCart = () => {
        const product = {
            title,
            name,
            price,
            image,
            amount
        };
        dispatch(addToCart(product)); 
    }

    const handleUpdateAmount = (action: string) => {
        const product = cart.find((item: any) => item.name === name);
        if (product) {
          const newAmount = action === 'increase' ? product.amount + 1 : product.amount - 1;
          if (newAmount > 0) {
            dispatch(updateCartItem({ name, amount: newAmount })); 
          } else {
            dispatch(removeFromCart(name)); 
          }
        }
      };

    return (
        <div>
        {cart.some((item: any) => item.name === name) ? (
            <div className='buy-button'>
                <button className='buy-button__reducer' onClick={() => handleUpdateAmount('decrease')}><div className='buy-minus'/></button>
                <span><h2>{amountText} {amount}</h2></span>
                <button className='buy-button__reducer' onClick={() => handleUpdateAmount('increase')}><div className='buy-plus-one'/><div className='buy-plus-two'/></button>
            </div>
        ) : (
            <button onClick={handleAddToCart}>{buttonText}</button>
        )}
    </div>
    )
}

export default BuyButton