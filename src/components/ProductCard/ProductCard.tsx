import { Link } from 'react-router-dom';
import './ProductCard.css'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../reducers/cartSlice';
import { FaCheck } from "react-icons/fa";
import { useState } from 'react';



interface ProductCardProps {
    image: string;
    name: string;
    title: string;
    price: number;
    category: string | undefined;
}

const ProductCard: React.FC<ProductCardProps> = ({ image, title, name, price, category }) => {
    const dispatch = useDispatch();

    const [isAdded, setIsAdded] = useState(false)

    function formatPrice(price: number): string {
        return price % 1 === 0 ? price.toString() : price.toFixed(2)
    }

    const handleAddToCart = () => {
        const product = {
            title,
            name,
            price,
            image,
            amount: 1,
        };
        dispatch(addToCart(product));

        setIsAdded(true);
        setTimeout(() => {
            setIsAdded(false);
            }, 300); 
    };

    return (
        <div className="product-card">
            <div className='product-card__top'>
                <Link to={`/${category}/${name.toLowerCase()}`} className="product-card__link">
                    <img src={image} className='product-card__image'/>
                </Link>
                <button className='product-card__button' onClick={handleAddToCart}>
                    {isAdded ? <FaCheck size={24}  className="show"/> : 'Köp'}
                </button>
            </div>
            <div className='product-card__info'>
                <h2 className='product-card__type'>{title} '{name}'</h2>
                <h2 className='product-card__price'>{formatPrice(price)}kr</h2>
            </div>
        </div>
    )
}

export default ProductCard;

