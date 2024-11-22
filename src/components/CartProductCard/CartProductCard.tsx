import BuyButton from '../BuyButton/BuyButton';
import './CartProductCard.css'

interface CartProductCardProps {
    image: string;
    title: string;
    name: string;
    price: number;
    amount: number;
}

const CartProductCard: React.FC<CartProductCardProps> = ({image, title, name, price, amount }) => {
    const totalPrice = price * amount;

    function formatPrice(price: number): string {
        if (Number.isInteger(price)) {
            return price.toString();
        } else {
            return price.toFixed(2); 
        }
    }

    return (
        <section className='cart-product-card'>
            <img src={image} />
            <article className='cart-product-card__info'>
                <h2>{title} '{name}'</h2>
                <div className='cart-product-card__info-bottom'>
                    <h2>{formatPrice(totalPrice)}kr</h2>
                    <BuyButton 
                        buttonText={'Lägg tillbaka i varukorgen'} 
                        amountText=''
                        title={title} 
                        name={name} 
                        price={price} 
                        image={image} />
                </div>
            </article>
        </section>
    )
}

export default CartProductCard;