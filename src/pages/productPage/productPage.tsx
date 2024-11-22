import { useParams } from 'react-router';
import products from '../../assets/products.json'
import categories from '../../assets/categories.json'
import reviews from '../../assets/reviews.json'
import './productPage.css'
import NotFoundPage from '../notFoundPage/notFoundPage';
import ReviewStars from '../../components/ReviewStars/ReviewStars';
import { useState } from 'react';
import BuyButton from '../../components/BuyButton/BuyButton';
import useWindowSize from '../../hooks/useWindowSize';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const { category, product } = useParams();
  const productData = products.find(prd => prd.name.toLowerCase() === product);
  const [mainImage, setMainImage] = useState(productData?.images[0])

  const artNr = productData?.artNr
  const productReviews = reviews.filter(review => review.product === artNr)
  const { width } = useWindowSize();
  const isMobile = width <= 768;

  function formatPrice(price: number): string {
      return price % 1 === 0 ? price.toString() : price.toFixed(2)
  }

  const findGroup = (category: string): string => {
    for (const group of categories) {
      if (group.children?.includes(category)) {
        return group.title;
      }
    }
    return 'Unknown';
  };

  const group = category ? findGroup(category).toLowerCase() : '*';

  const calculateAverageStars = (reviews: any[]) => {
    if (reviews.length === 0) return 0;
    const totalStars = reviews.reduce((acc, review) => acc + review.stars, 0);
    return (totalStars / reviews.length).toFixed(1);
  };

  const averageStars = calculateAverageStars(productReviews);

  if (!productData) {
    return ( <NotFoundPage /> )
  }

    return (
        <main className='product-page'>
            {isMobile && <div className='product-page__title'>
                <div className='product-page__position'>
                    <Link className='product-page__link' to={`/${group}`}><h2>{group} /&nbsp;</h2></Link>
                    <Link className='product-page__link' to={`/${category}`}><h2>{category} /&nbsp;</h2></Link>
                    <h2>{productData.name}</h2>
                </div>
                <h1 className='product-page__info-name'>{productData.title} </h1>
                <h1 className='product-page__info-name'>'{productData.name}'</h1>
                    <p className='product-page__info-latin'>{productData.latin}</p>
                    </div>}
            <div className='product-page__top-half'>
                <section className='product-page__images'>
                    <img src={mainImage} alt={productData.name}  className='product-page__main-image'/>
                    {productData?.images.length > 1 && (
                        <div className='product-page__gallery'>
                            {productData.images.map((image, index) => (
                            <div
                                key={index}
                                className={`${image === mainImage ? 'product-page__gallery-active' : 'product-page__gallery-image'}`}
                            >
                                <img
                                src={image}
                                alt={`${productData.name} ${index + 1}`}
                                className={`${isMobile ? 'product-page__gallery-circle' : 'product-page__thumbnail'}`}
                                onClick={() => setMainImage(image)}
                                />
                            </div>
                            ))}
                        </div>
                        )}
                </section>
                <section className='product-page__info'>
                    {!isMobile && <div>
                        <h1 className='product-page__info-name'>{productData.title} '{productData.name}'</h1>
                        <p className='product-page__info-latin'>{productData.latin}</p>
                    </div>}
                    <div className='product-page__price-button'>
                        <h1  className='product-page__info-price'>{formatPrice(productData.price)} kr</h1>
                        <BuyButton 
                            buttonText={'Lägg till i varukorg'} 
                            amountText='Antal'
                            title={productData.title} 
                            name={productData.name} 
                            price={productData.price} 
                            image={productData.images[0]} />
                    </div>
                    <h2 className='product-page__description-head'>Beskrivning</h2>
                    <div className='product-page__description'>
                        {productData.description.map((part, index) => (
                        <p key={index}>{part}</p>
                        ))}
                    </div>
                    <p className='product-page__info-info'>
                        <b>Portionsmängd:</b> {productData.portion} <br />
                        <b>Växtläge:</b> {productData.position} <br />
                        <b>Höjd:</b> {productData.height} <br />
                        <b>Såtid:</b> {productData.sow} <br />
                        <b>Grotid:</b> {productData.germination} <br />
                        <b>Blomtid/Skördetid:</b> {productData.harvest} <br />
                        <b>Årighet:</b> {productData.lifespan} <br />
                        <b>Art. nr:</b> {productData.artNr}
                    </p>
                </section>
            </div>
            <section className='product-page__user-reviews'>
                <div className='product-page__review-title'>
                    <h1>Kundrecenssioner </h1>
                    <h2 className='product-page__review-average'>{averageStars}/5</h2>
                </div>
                {productReviews.length > 0 ? (
                    productReviews.map((review, index) => (
                        <div key={index} className='product-page__review'>
                            <ReviewStars 
                            stars = {review.stars} 
                            />
                            <p>{review.comment}</p>
                            <p>- {review.author}, {review.date}</p>
                        </div>
                    ))
                ) : (
                    <p>Inga recenssioner för denna product än</p>
                )}
            </section>
        </main>
    )
}

export default ProductPage;