import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PayPopup.css'
import { useDispatch } from 'react-redux';
import { clearCart } from '../../reducers/cartSlice';

interface PayPopupProps {
  onClose: () => void;
}

const PayPopup: React.FC<PayPopupProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = (path: string) => {
    localStorage.clear();
    dispatch(clearCart())
    onClose();
    navigate(path);
  };

  return (
    <div className="paypopup">
      <div className="paypopup-content">
        <h2>PAY ME</h2>
        <p>Här kommer din säkra betalning med QR-kod för bankid att dyka upp</p>
        <button onClick={() => handleNavigate('/checkout/confirmation')}>Okej!</button>
        <button onClick={onClose}>Stäng</button>
      </div>
    </div>
  );
};

export default PayPopup;