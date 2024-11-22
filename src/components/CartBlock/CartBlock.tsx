import { useNavigate } from 'react-router-dom';
import './CartBlock.css'
import CartProductCard from '../CartProductCard/CartProductCard';
import { useSelector } from 'react-redux';
import { useState } from 'react';

interface CartBlockProps {
    exitFunct: () => void;

}

const CartBlock: React.FC<CartBlockProps> = ({exitFunct}) => {
    const navigate = useNavigate();
    const cart = useSelector((state: any) => state.cart.items);

    const [errorMessage, setErrorMessage] = useState<string>('');

    const total = cart.reduce((acc: number, item: any) => acc + item.price * item.amount, 0)

    let friFrakt = "Fri frakt vid köp över 200kr";
    if (total > 199.99) {friFrakt = ""}

    function formatPrice(price: number): string {
        return price % 1 === 0 ? price.toString() : price.toFixed(2)
    }

    const handleCartClick = (e: { stopPropagation: () => void; }) => {
        e.stopPropagation();
    };

    const handleCheckoutClick = () => {
        if (cart.length !== 0 && localStorage.getItem('cart')) {
            navigate('/checkout')
            exitFunct()
        }
        setErrorMessage('Varukorgen är tom, lägg till varor innan du fortsätter till kassan');
        return;
        
    }

    return (
        <div className='cart-block' onClick={handleCartClick}>
            <div className='cart-block__exit' onClick={exitFunct}>
                <div className='exit-line-one'/>
                <div className='exit-line-two'/>
            </div>
            <h1>Varukorg</h1>
            <div className='cart-block__items'>
                {cart.map((item: any) => (
                    <CartProductCard
                        key={item.name}
                        image={item.image}
                        title={item.title}
                        name={item.name}
                        price={item.price}
                        amount={item.amount}
                    />
                ))}
            </div>
            <div className='cart-block__bottom'>
                <p>{friFrakt}</p>
                <h2>Totalt: {formatPrice(total)}kr</h2>
                {errorMessage && <div className="error-message"><p className='cart-block__error-message'>{errorMessage}</p></div>}
                <button onClick={handleCheckoutClick} className='cart-block__button'>Till kassan</button>
            </div>
        </div>
    )
}

export default CartBlock;