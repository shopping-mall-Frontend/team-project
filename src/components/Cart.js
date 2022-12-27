import reset from '../css/reset-css.css';
import styled from 'styled-components';

export const CartHeader = () => {
  return (
    <Header>
      <input type="checkbox" />
      <span>상품정보</span>
      <span>수량</span>
      <span>주문금액</span>
      <span>배송비</span>
    </Header>
  );
};

export const CartList = ({ cart }) => {
  return (
    <List>
      <input type="checkbox" />
      <img src="" alt="" />
      <p>{cart.title}</p>
      <div>
        <span>{cart.quantity}</span>
      </div>
      <span>{cart.price * cart.quantity}원</span>
      <span>2500원</span>
    </List>
  );
};

const Header = styled.div`
  border-bottom: 1px solid #000;
  font-weight: 700;
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;

const List = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 30px;
`;
