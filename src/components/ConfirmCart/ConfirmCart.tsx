import './ConfirmCart.css'
import { useSelector } from 'react-redux';

interface ConfirmCartCardProps {
    image: string;
    name: string;
    title: string;
    amount: number;
}

const ConfirmCartCard: React.FC<ConfirmCartCardProps> = ({image, name, title, amount}) => {

    return (
        <div className='confirm-cart-card'>
            <img src={image} alt={name} className='confirm-cart-card__image' />
            <h2>{amount}x {title} '{name}'</h2>
        </div>
    )

}

const ConfirmCart = () => {
    const cart = useSelector((state: any) => state.cart.items);

    return (
            <div className='confirm-cart'>
                {cart.map((item: any) => (
                    <ConfirmCartCard 
                        image={item.image} 
                        name={item.name} 
                        title={item.title} 
                        amount={item.amount} />
                ))}
            </div>
    )
}

export default ConfirmCart;