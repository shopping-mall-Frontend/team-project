import styles from '../css/CartPage.module.css';
import Header from '../components/Header';

export const CartHeader = () => {
  return (
    <div>
      <input type="checkbox" />
      <span>상품정보</span>
      <span>수량</span>
      <span>주문금액</span>
      <span>배송비</span>
    </div>
  );
};

export const CartList = ({ cart }) => {
  return (
    <div>
      <input type="checkbox" />
      <img src="" alt="" />
      <p>{cart.title}</p>
      <div>
        <span>{cart.quantity}</span>
      </div>
      <span>{cart.price * cart.quantity}원</span>
      <span>2500원</span>
    </div>
  );
};
