import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/homePage/homePage';
import './App.css'
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import NotFoundPage from './pages/notFoundPage/notFoundPage';
import CategoryPage from './pages/categoryPage/categoryPage';
import ProductPage from './pages/productPage/productPage';
import CheckoutPage from './pages/checkoutPage/checkoutPage';
import ConfirmPage from './pages/confirmPage/confirmPage';
import ConfirmationPage from './pages/confirmationPage/confirmationPage';
import MobileHeader from './components/MobileHeader/MobileHeader';
import useWindowSize from './hooks/useWindowSize';
import MobileFooter from './components/MobileFooter/MobileFotter';

function App() {
  const { width } = useWindowSize();
  const isMobile = width <= 768;
  

  return (
    <div className='app'>
      <div className='top-bar'><p>Gratis frakt vid köp över 200kr</p></div>
      {isMobile ? <MobileHeader /> : <Header /> }
      <div className='wrapper'>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:category" element={<CategoryPage />} />
          <Route path="/:category/:product" element={<ProductPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/confirm" element={<ConfirmPage />} />
          <Route path="/checkout/confirmation" element={<ConfirmationPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <div className='bottom-bar'></div>
      {isMobile ? <MobileFooter /> : <Footer /> }
    </div>
  );
}

export default App;