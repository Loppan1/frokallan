import { Link } from 'react-router-dom';
import { useState } from 'react';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';
import PayPopup from '../../components/PayPopup/PayPopup';
import './confirmPage.css'
import ConfirmCart from '../../components/ConfirmCart/ConfirmCart';

const ConfirmPage = () => {
    const contactDetails = useSelector((state: RootState) => state.contact)
    const paymentDetails = useSelector((state: RootState) => state.payment)
    const shippingDetails = useSelector((state: RootState) => state.shipping)
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const calculateTotalCost = () => {
      return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
    };

    function formatPrice(price: number): string {
      if (Number.isInteger(price)) {
          return price.toString();
      } else {
          return price.toFixed(2); 
      }
  }
  
    const totalPrice = calculateTotalCost();
    let frakt = 0;
    if (totalPrice < 199.99) { frakt = 29}
    const total = formatPrice(totalPrice + frakt);
    const moms = formatPrice((totalPrice + frakt) * 0.25);

  const shippingType = shippingDetails.shippingType === 'home' ? 'Hemleverans' : 'Upphämtning';
  let paymentType = '' 
  
  if (paymentDetails.paymentType === 'card') {paymentType = 'Kortbetalning'} 
    else if (paymentDetails.paymentType === 'klarna') {paymentType = 'Klarna'}
    else {paymentType = 'Swish'}

    return (
        <main className='confirm-page'>
            <h1 className='confirm-page__page-title'>Bekräfta köp</h1>
            <ConfirmCart />
            <article className='confirm-page__cart-info'>
                <h2>Frakt: {frakt}kr</h2>
                <h2>Total: {total}kr</h2>
                <p className='confirm-page__moms'>Varav moms: {moms}</p>
            </article>
            <article className='confirm-page__customer-info'>
                <h2>{contactDetails.email}</h2>
                <h2>{contactDetails.name}</h2>
                <h2>{contactDetails.address} {contactDetails.addressTwo}</h2>
                <h2>{contactDetails.zipcode} {contactDetails.city}</h2>
                <h2>{contactDetails.telephone}</h2>
                <br />
                <h2>Leveranstyp: {shippingType}</h2>
                <h2>Betalningstyp: {paymentType}</h2>
            </article>
            <p className='confirm-page__cancel-button'><Link to="/checkout" className='confirm-page__link'>Ändra information</Link></p>
            <button onClick={handleOpenPopup} className='confirm-page__confirm-button'>Bekräfta köp</button>
            {isPopupOpen && <PayPopup onClose={handleClosePopup} />}
        </main>
    )
}

export default ConfirmPage;