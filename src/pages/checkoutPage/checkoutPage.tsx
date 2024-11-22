import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setEmail, setContactDetails } from '../../reducers/contactSlice';
import { setShippingType } from '../../reducers/shippingSlice';
import { setPaymentType } from '../../reducers/paymentSlice';
import postnord from '../../assets/postnord.avif'
import schenker from '../../assets/schenker.avif'
import amex from '../../assets/amex-icon.png'
import visa from '../../assets/visa-icon.png'
import mastercard from '../../assets/mastercard-icon.png'
import klarna from '../../assets/klarna-icon.webp'
import swish from '../../assets/swish-icon.svg'
import './checkoutPage.css'
import { useNavigate } from 'react-router';
import CartProductCard from '../../components/CartProductCard/CartProductCard';
import useWindowSize from '../../hooks/useWindowSize';

const CheckoutPageCart = () => {
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [couponVisible, setCouponVisible] = useState(false);

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

    function handleCoupon() {
        setCouponVisible(!couponVisible)
    }
    
    const totalPrice = calculateTotalCost();
    const total = formatPrice(totalPrice);
    const moms = formatPrice(totalPrice * 0.25);
    let frakt = 0;
    if (totalPrice < 199.99) { frakt = 29}
    return (
            <aside className='checkout-page__cart'>
                <h1>Varukorg</h1>
                <div className='checkout-page__cart-items'>
                    {cartItems.map((item) => (
                        <div key={item.name} className="cart-item">
                            <CartProductCard 
                                image={item.image} 
                                title={item.title} 
                                name={item.name} 
                                price={item.price} 
                                amount={item.amount} />
                        </div>
                    ))}
                </div>
                <div className='checkout-page__cart-code'>
                <h2 onClick={handleCoupon}>Lägg till rabattkod +</h2>
                {couponVisible  && (               
                <div className='checkout-page__code-section'>
                    <input type='text' placeholder='Rabattkod...' id='code' className='checkout-page__code-input' />
                    <button className='checkout__code-button'>Lägg till</button>
                </div>

                )}

                </div>
                <div className='checkout-page__cart-total'>
                <h2>Totalt: {total}kr </h2>
                    <h2>Frakt: {frakt}kr</h2> 
                    <p>Varav moms: {moms}kr </p>
                </div>
            </aside>
            )
}


const CheckoutPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const contactDetails = useSelector((state: RootState) => state.contact);
    const { width } = useWindowSize();
    const isMobile = width <= 768;

    const [isEmailFilled, setIsEmailFilled] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [, setIsEmailTouched] = useState(false);
    const [selectedStep, setSelectedStep] = useState<string>('contact');
    const [selectedDeliveryType, setSelectedDeliveryType] = useState<string>('');
    const [selectedPaymentType, setSelectedPaymentType] = useState<string>('');
    const [acceptTos, setAcceptTos] = useState(false);
    const [tosError, setTosError] = useState<string>('')

    const [email, setEmailState] = useState(contactDetails.email);
    const [name, setName] = useState(contactDetails.name);
    const [address, setAddress] = useState(contactDetails.address);
    const [addressTwo, setAddressTwo] = useState(contactDetails.addressTwo);
    const [zipcode, setZipcode] = useState(contactDetails.zipcode);
    const [city, setCity] = useState(contactDetails.city);
    const [telephone, setTelephone] = useState(contactDetails.telephone);
    const [errors, setErrors] = useState({
        name: '',
        zipcode: '',
        city: '',
        telephone: ''
      });

    const isPaymentEnabled = isEmailFilled && selectedDeliveryType !== null && name !== '' && zipcode !== '' && city !== '' && telephone !== '';

    const cartItems = useSelector((state: RootState) => state.cart.items);
    const calculateTotalCost = () => {
        return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
    };
    const totalPrice = calculateTotalCost();
    let frakt = 0;
    if (totalPrice < 199.99) { frakt = 29}

    const validateEmail = (email: string): boolean => {
        return /\S+@\S+\.\S+/.test(email);
    };

    useEffect(() => {
        if (email && validateEmail(email)) {
            setIsEmailFilled(true);
        }
    }, [email]);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const emailValue = event.target.value.trim();
        setEmailState(emailValue)
        setIsEmailFilled(emailValue !== '' && validateEmail(emailValue));
    };

    const handleEmailBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const emailValue = event.target.value.trim();
        setIsEmailTouched(true);
        if (!emailValue) {
            setErrorMessage('Fyll i din e-postadress');
        } else if (!validateEmail(emailValue)) {
            setErrorMessage('Ogiltig e-postadress');
        } else {
            setErrorMessage('');
        }
    };

    const handleDeliveryTypeClick = (type: string) => {
        if (!isEmailFilled) {
            setErrorMessage('Fyll i din e-postadress');
        } else {
            setErrorMessage(''); 
            setSelectedDeliveryType(type);
        }
    }

    const handleStepChangeOne = (event: React.MouseEvent<HTMLButtonElement>, step: string) => {
        event.preventDefault();
        if (email !== '' || contactDetails.email !== '') {
            dispatch(setEmail(email));
            setSelectedStep(step)
        } else {
            setErrorMessage('Fyll i din e-postadress');
        }
    }

    const validateFields = () => {
        const newErrors = {
          name: name.trim() === '' ? 'Fyll i för- och efternamn' : '',
          zipcode: zipcode.trim() === '' ? 'Fyll i postnummer' : '',
          city: city.trim() === '' ? 'Fyll i postort' : '',
          telephone: telephone.trim() === '' ? 'Fyll i telefonnummer' : ''
        };
        setErrors(newErrors);
    
        return Object.values(newErrors).every(error => error === '');
      };

    const handleStepChangeTwo = (event: React.MouseEvent<HTMLButtonElement>, step: string) => {
        if (validateFields()) {
            event.preventDefault();
            if (isPaymentEnabled) {
                dispatch(setContactDetails({
                    email,
                    name,
                    address,
                    addressTwo,
                    zipcode,
                    city,
                    telephone,
                }));
                setSelectedStep(step);
            } else {
                setErrorMessage('Fyll i din e-postadress');
            }
        } else {
            event.preventDefault();
        }
    }

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAcceptTos(e.target.checked);
      };

    const handleProceed = () => {
        if (acceptTos === true) {
            dispatch(setShippingType(selectedDeliveryType))
            dispatch(setPaymentType(selectedPaymentType))
            navigate('./confirm')
        } else {
            setTosError('Du måste godkänna våra köpvillkor')
        }
    }

    return (
        <main className='checkout-page'>
            <h1 className='checkout-page__page-title'>Kassa</h1>
            {isMobile && <CheckoutPageCart />}
            <section className='checkout-page__left'>
                <form className='checkout__form'>
                    <h1 className='checkout-page__form-title contact-title'>Kontakt</h1>
                    {selectedStep === 'contact' ? (
                    <div className='checkout-page__contact-section'>
                        <label htmlFor='email'>E-postadress
                        <input 
                            id='email' 
                            value={email}
                            type='text' 
                            placeholder='Fyll i din e-postadress...' 
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                        {errorMessage && <p className='error'>{errorMessage}</p>}</label>
                        <label htmlFor='newsletter' className='flex-row'><input id='newsletter' type='checkbox' />
                        Jag vill få Frökällans nyhetsbrev</label>
                        <button 
                            className='checkout__to-delivery'
                            onClick={(e) => handleStepChangeOne(e, 'delivery')}
                        >Fortsätt</button>
                    </div>
                ) : (
                    <div className='checkout-page__contact-section'>
                        <p>{email}</p>
                        <p  className='checkout-page__edit-button'
                            onClick={() => setSelectedStep('contact')}>Ändra</p>
                    </div>
                )}

                    <div className='checkout-form__delivery'>
                        <h1 className={`checkout-page__form-title ${selectedStep === 'payment' || selectedStep === 'delivery' ? '' : 'title-inactive'}`}>
                            Leverans
                        </h1>
                        <p>Vi levererar endast inom Sverige</p>
                    </div>

                    {selectedStep === 'delivery' ? (
                        <div className='checkout-page__delivery-section'>
                            <h2 
                                className={`delivery-option ${selectedDeliveryType === 'home' ? 'active' : ''} ${!isEmailFilled ? 'disabled' : ''}`}
                                onClick={() => handleDeliveryTypeClick('home')}>
                                Hemleverans 
                                <img src={postnord} alt='postnord' className='delivery-icon' />
                                {frakt}kr
                            </h2>
                            <h2 
                                className={`delivery-option ${selectedDeliveryType === 'pickup' ? 'active' : ''} ${!isEmailFilled ? 'disabled' : ''}`}
                                onClick={() => handleDeliveryTypeClick('pickup')}>
                                Utlämningsställe <img src={schenker} alt='postnord' className='delivery-icon' />
                                {frakt}kr
                            </h2>
                        </div>
                    ) : (
                        <div className='checkout-page__delivery-section'>
                        {selectedDeliveryType === 'home' && (
                            <>
                                <h2>Hemleverans, {frakt}kr</h2>
                                <p>{name}</p>
                                <p>{telephone}</p>
                                <p>{address} {addressTwo}</p>
                                <p>{zipcode} {city}</p>
                                <p  className='checkout-page__edit-button'
                                    onClick={() => setSelectedStep('delivery')}>Ändra</p>
                            </>
                        )}
                        {selectedDeliveryType === 'pickup' && (
                            <>
                                <h2>Utlämningsställe, {frakt}kr</h2>
                                <p>{name}</p>
                                <p>{telephone}</p>
                                <p>{zipcode} {city}</p>
                                <p  className='checkout-page__edit-button'
                                    onClick={() => setSelectedStep('delivery')}>Ändra</p>
                            </>
                        )}
                        </div>
                    )}
                        
                    {selectedDeliveryType === 'home' && selectedStep === 'delivery' && (
                        <div className='delivery-home'>
                            <p>2-4 arbetsdagar <br/>
                            Dina fröer levereras hem till din brevlåda</p>
                            <label htmlFor='name'>För- och efternamn
                            {errors.name && <div className='error'>{errors.name}</div>} 
                            <input 
                                id='name' 
                                type='text' 
                                placeholder='Förnamn Efternamn...' 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            /></label>
                            <label htmlFor='address'>Adress
                            <input 
                                id='address' 
                                type='text' 
                                placeholder='Adressrad 1...' 
                                onChange={(e) => setAddress(e.target.value)}
                                value={address}
                            />
                            <input 
                                id='address-2' 
                                type='text' 
                                placeholder='Adressrad 2...' 
                                onChange={(e) => setAddressTwo(e.target.value)}
                                value={addressTwo}
                            /></label>
                            <div className='checkout-form__post-pair'>
                                <label htmlFor='zipcode'>Postnummer
                                {errors.zipcode && <div className='error'>{errors.zipcode}</div>} 
                                <input 
                                    id='zipcode' 
                                    type='text' 
                                    placeholder='000 00...' 
                                    onChange={(e) => setZipcode(e.target.value)}
                                    value={zipcode}
                                /></label>
                                <label htmlFor='city'>Postort
                                {errors.city && <div className='error'>{errors.city}</div>} 
                                <input 
                                    id='city' 
                                    type='text' 
                                    placeholder='Postort...' 
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                /></label>
                            </div>
                            <label htmlFor='telephone'>Telefonnummer
                            {errors.telephone && <div className='error'>{errors.telephone}</div>} 
                                <input 
                                    type='text' 
                                    id='telephone' 
                                    placeholder='Telefonnummer...' 
                                    onChange={(e) => setTelephone(e.target.value)}
                                    value={telephone}
                                />
                            </label>
                            <button 
                                className='checkout__to-payment'
                                onClick={(e) => handleStepChangeTwo(e, 'payment')}>
                                Fortsätt
                            </button>
                        </div>
                    )}

                    {selectedDeliveryType === 'pickup' && selectedStep === 'delivery' && (
                        <div className='delivery-pickup'>
                            <p>2-4 arbetsdagar <br/>
                            Dina fröer levereras till ett utlämningsställe nära dig. Du får en avisering via sms när dina fröer finns att hämta</p>
                            <label htmlFor='name'>För- och efternamn
                            {errors.name && <div className='error'>{errors.name}</div>} 
                            <input 
                                id='name' 
                                type='text' 
                                placeholder='Förnamn Efternamn...' 
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            /></label>
                            <div className='checkout-form__post-pair'>
                                <label htmlFor='zipcode'>Postnummer
                                {errors.zipcode && <div className='error'>{errors.zipcode}</div>} 
                                <input 
                                    id='zipcode' 
                                    type='text' 
                                    placeholder='000 00...' 
                                    onChange={(e) => setZipcode(e.target.value)}
                                    value={zipcode}
                                /></label>
                                <label htmlFor='city'>Postort
                                {errors.city && <div className='error'>{errors.city}</div>} 
                                <input 
                                    id='city' 
                                    type='text' 
                                    placeholder='Postort...' 
                                    onChange={(e) => setCity(e.target.value)}
                                    value={city}
                                /></label>
                            </div>
                            <label htmlFor='telephone'>Telefonnummer
                            {errors.telephone && <div className='error'>{errors.telephone}</div>} 
                                <input 
                                    type='text' 
                                    id='telephone' 
                                    placeholder='Telefonnummer...' 
                                    onChange={(e) => setTelephone(e.target.value)}
                                    value={telephone}
                                />
                            </label>
                            <button 
                                className='checkout__to-payment'
                                onClick={(e) => handleStepChangeTwo(e, 'payment')}>
                                Fortsätt
                            </button>
                        </div>
                    )}                    
                </form>
                
                <form className={`checkout-payment ${isPaymentEnabled ? '' : 'disabled'}`}>
                <h1 className={`checkout-page__form-title ${selectedStep === 'home' ||  selectedStep === 'payment' ? '' : 'title-inactive'}`}>
                    Betalsätt
                </h1>
                {selectedStep === 'payment' && (
                    <>
                        <label htmlFor='card' className="payment-radio">
                            <input 
                                id='card' 
                                type='radio' 
                                name='payment' 
                                value='card'
                                disabled={!isPaymentEnabled}
                                onChange={() => setSelectedPaymentType('card')}
                            />
                            <span className='payment-span'>
                                Kort 
                                <img src={visa} alt='visa-card' className='payment-icon-visa payment-icon-first' />
                                <img src={mastercard} alt='mastercard-card' className='payment-icon' />
                                <img src={amex} alt='amex-card' className='payment-icon' />
                            </span>
                            {selectedPaymentType === 'card' && (
                                    <label className='checkout-page__payment-card'>Kortuppgifter
                                        <input type='text' placeholder='Kortnummer'/>
                                        <div className='checkout-page__card-specifics'>
                                            <input type='text' placeholder='MM'/>
                                            <input type='text' placeholder='ÅÅ'/>
                                            <input type='text' placeholder='CVC'/>
                                        </div>
                                        <input type='text' placeholder='Kortinnehavare'/>
                                    </label>
                            )}
                        </label>
                        <label htmlFor='klarna' className='flex-row payment-radio'>
                            <input 
                                id='klarna' 
                                type='radio' 
                                name='payment' 
                                value='klarna' 
                                disabled={!isPaymentEnabled}
                                onChange={() => setSelectedPaymentType('klarna')}
                            />
                            <span className='payment-span'>
                                Klarna
                                <img src={klarna} alt='visa-card' className='payment-icon-first' />
                            </span>
                            {selectedPaymentType === 'klarna' && (
                                    <label className='checkout-page__payment-card'>Upprepa e-postadress
                                        <input type='text' placeholder='E-postadress'/>
                                    </label>
                            )}
                        </label>
                        <label htmlFor='swish' className='flex-row payment-radio'>
                            <input 
                                id='swish' 
                                type='radio' 
                                name='payment' 
                                value='swish' 
                                disabled={!isPaymentEnabled}
                                onChange={() => setSelectedPaymentType('swish')}
                            />
                            <span className='payment-span'>
                                Swish
                                <img src={swish} alt='visa-card' className='payment-icon-first' />
                            </span>
                            {selectedPaymentType === 'swish' && (
                                    <label className='checkout-page__payment-card'>Ange telefonnummer
                                        <input type='text' placeholder='Telefonnummer'/>
                                    </label>
                            )}
                        </label>
                    </>
                )}
                </form>
                {selectedPaymentType !== '' &&
                    <div className='checkout-page__checkout'>
                        <label htmlFor='tos' className='flex-row checkout-page__tos'>
                        <input id='tos' type='checkbox' onChange={handleCheckboxChange}/>Jag godkänner Frökällans köpvilkor</label>
                        <p className='error'>{tosError}</p>
                        <button className='checkout__proceed-button'
                                onClick={handleProceed}>
                                Till betalning
                        </button>
                    </div>
                }
            </section>
                {!isMobile && <CheckoutPageCart />}
        </main>
    )
}

export default CheckoutPage;